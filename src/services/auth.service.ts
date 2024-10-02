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
import { refreshTokenOption, signToken } from "../utils/jwt";

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
    const refreshToken = signToken(sessionInfo, refreshTokenOption);

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
    const refreshToken = signToken(sessionInfo, refreshTokenOption);

    // sign access token
    const accessToken = signToken({ ...sessionInfo, userId });

    return { user: user.omitPassword(), refreshToken, accessToken };
};
