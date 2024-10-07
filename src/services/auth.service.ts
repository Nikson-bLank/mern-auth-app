import dayjs from "dayjs";
import { APP_ORIGIN } from "../const/env";
import {
    CONFLICT,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED,
} from "../const/http";
import verificationCodeType from "../const/verificationCodeTypes";
import logger from "../lib/logger";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appErrorAssert from "../utils/appErrorAssert";
import { hashValue } from "../utils/bcrypt";
import {
    getPasswordResetEmail,
    getVerificationEmail,
} from "../utils/emailTemplates";
import {
    refreshTokenOptions,
    RefreshTokenPayload,
    signToken,
    verifyToken,
} from "../utils/jwt";
import { sendMail } from "../utils/sendMail";

type AuthParam = {
    email: string;
    password: string;
    userAgent?: string;
};

export const createAccount = async (data: AuthParam) => {
    // verify if user already exist
    const existingUser = await UserModel.exists({
        email: data.email,
    });

    appErrorAssert(
        !existingUser,
        CONFLICT,
        "Email already exist!, Please try again with different email."
    );

    // create user

    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    });

    const userId = user._id;

    // create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId,
        type: verificationCodeType.EmailVerification,
        expiresAt: dayjs().add(1, "year"),
    });

    //send email
    const url = `${APP_ORIGIN}/auth/email/verify/${verificationCode._id}`;
    logger.info(`auth.service.ts ~ createAccount, url:: ${url}`);

    const { error } = await sendMail({
        to: user.email,
        ...getVerificationEmail(url),
    });

    if (error)
        logger.error(
            `auth.service.ts ~ createAccount, sendMail::${JSON.stringify(
                error
            )}`
        );

    // create session
    const session = await SessionModel.create({
        userId,
        userAgent: data.userAgent,
    });

    const sessionInfo = {
        sessionId: session._id,
    };

    //  sign refresh token
    const refreshToken = signToken(sessionInfo, refreshTokenOptions);

    // sign access token
    const accessToken = signToken({ ...sessionInfo, userId });

    // return user and tokens
    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken,
    };
};

export const loginUser = async ({ email, password, userAgent }: AuthParam) => {
    // get user by email
    const user = await UserModel.findOne({ email });
    appErrorAssert(user, UNAUTHORIZED, "Invalid email or password");

    const isValid = await user.comparePassword(password);
    appErrorAssert(isValid, UNAUTHORIZED, "Invalid email or password");

    let userId = user._id;

    // create session
    const session = await SessionModel.create({
        userId,
        userAgent,
    });

    const sessionInfo = {
        sessionId: session._id,
    };

    //  sign refresh token
    const refreshToken = signToken(sessionInfo, refreshTokenOptions);

    // sign access token
    const accessToken = signToken({ ...sessionInfo, userId });

    return { user: user.omitPassword(), refreshToken, accessToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    const now = dayjs();
    const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
        secret: refreshTokenOptions.secret,
    });
    appErrorAssert(payload, UNAUTHORIZED, "Invalid refresh token");

    // check session and expiration time if it is over
    const session = await SessionModel.findById(payload?.sessionId);
    appErrorAssert(
        session && !dayjs(session.expiresAt).isBefore(now),
        UNAUTHORIZED,
        "Session expired"
    );

    // refresh token if the session is going to expire in next 24 hr

    const expireAtDate = dayjs(session.expiresAt);
    const hoursRemaining = expireAtDate.diff(now, "hours");
    const sessionNeedsRefresh = hoursRemaining <= 24 && hoursRemaining > 0;

    if (sessionNeedsRefresh) {
        session.expiresAt = now.add(30, "days").toDate();
        session.save();
    }

    const sessionId = session._id;
    const userId = session.userId;

    const newRefreshToken = sessionNeedsRefresh
        ? signToken({ sessionId }, refreshTokenOptions)
        : undefined;

    const accessToken = signToken({ sessionId, userId });

    return { accessToken, refreshToken: newRefreshToken };
};

export const verifyEmail = async (code: string) => {
    //check for verification code
    const verificationCode = await VerificationCodeModel.findOne({
        _id: code,
        type: verificationCodeType.EmailVerification,
        expiresAt: { $gt: dayjs() },
    });

    appErrorAssert(
        verificationCode,
        NOT_FOUND,
        "Invalid or expired verification code"
    );
    // update user to verify
    const updatedUser = await UserModel.findByIdAndUpdate(
        verificationCode.userId,
        {
            verified: true,
        },
        {
            new: true,
        }
    );

    appErrorAssert(
        updatedUser,
        INTERNAL_SERVER_ERROR,
        "Failed to verify email"
    );

    // delete verification data
    await verificationCode.deleteOne();

    //   return updatedUser
    return {
        user: updatedUser?.omitPassword(),
    };
};

export const sendPasswordResetEmail = async (email: string) => {
    const user = await UserModel.findOne({
        email,
    });

    appErrorAssert(user, NOT_FOUND, "User not found");

    // check email rate limit
    let userId = user._id;
    const now = dayjs();
    const fiveMinuteAgo = now.subtract(5, "minutes");

    const count = await VerificationCodeModel.countDocuments({
        userId,
        type: verificationCodeType.PasswordReset,
        createdAt: { $gt: fiveMinuteAgo },
    });
    appErrorAssert(
        count <= 1,
        TOO_MANY_REQUESTS,
        "Too many request, please try again later."
    );

    //  create verification code
    const expiresAt = now.add(1, "hour");

    const verificationCode = await VerificationCodeModel.create({
        userId,
        type: verificationCodeType.PasswordReset,
        expiresAt,
    });

    appErrorAssert(
        verificationCode,
        INTERNAL_SERVER_ERROR,
        "Could not create verification code"
    );

    // send reset password mail
    let url = `${APP_ORIGIN}/password/reset?code=${
        verificationCode._id
    }&exp=${expiresAt.valueOf()}`;

    logger.info(`auth.service.ts ~ sendPasswordResetEmail, url:: ${url}`);

    const { data, error } = await sendMail({
        to: user.email,
        ...getPasswordResetEmail(url),
    });

    appErrorAssert(
        data?.id,
        INTERNAL_SERVER_ERROR,
        `Could not send reset password mail,${error?.name}-${error?.message} `
    );

    return {
        url,
        emailId: data.id,
    };
};

type ResetPasswordParams = {
    password: string;
    verificationCode: string;
};

export const resetPassword = async ({
    password,
    verificationCode,
}: ResetPasswordParams) => {
    const now = dayjs();
    // check for verification code
    const verification = await VerificationCodeModel.findOne({
        _id: verificationCode,
        type: verificationCodeType.PasswordReset,
        expiresAt: { $gt: now },
    });

    appErrorAssert(
        verification,
        NOT_FOUND,
        "Invalid or Expired verification code"
    );

    // update the user password

    const updatedUserPassword = await UserModel.findByIdAndUpdate(
        verification.userId,
        {
            password: await hashValue(password),
        },
        {
            new: true,
        }
    );

    appErrorAssert(
        updatedUserPassword,
        INTERNAL_SERVER_ERROR,
        "Failed to update password"
    );
    // delete verification data
    await verification.deleteOne();
    // delete all session
    await SessionModel.deleteMany({
        userId: updatedUserPassword._id,
    });

    return {
        user: updatedUserPassword.omitPassword(),
    };
};
