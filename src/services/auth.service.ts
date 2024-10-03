import dayjs from "dayjs";
import verificationCodeType from "../const/verificationCodeTypes";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import SessionModel from "../models/session.model";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../const/env";
import appErrorAssert from "../utils/appErrorAssert";
import { CONFLICT, UNAUTHORIZED } from "../const/http";
import logger from "../lib/logger";
import {
    refreshTokenOptions,
    RefreshTokenPayload,
    signToken,
    verifyToken,
} from "../utils/jwt";

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
