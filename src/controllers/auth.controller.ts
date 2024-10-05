import { CREATED, OK, UNAUTHORIZED } from "../const/http";
import logger from "../lib/logger";
import SessionModel from "../models/session.model";
import {
    createAccount,
    loginUser,
    refreshAccessToken,
    verifyEmail,
} from "../services/auth.service";
import appErrorAssert from "../utils/appErrorAssert";
import catchErrors from "../utils/catchErrors";
import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    setAuthCookies,
} from "../utils/cookie";
import { verifyToken } from "../utils/jwt";
import {
    authSchema,
    verificationCodeSchema,
} from "../validation-schema/auth.schema";

export const registerHandler = catchErrors(async (req, res) => {
    //validate request
    const request = authSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response

    return setAuthCookies({ res, accessToken, refreshToken })
        .status(CREATED)
        .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
    //validate request
    const request = authSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });

    // call service
    const { accessToken, refreshToken } = await loginUser(request);

    // return response

    return setAuthCookies({ res, accessToken, refreshToken })
        .status(CREATED)
        .json({
            message: "Logged in successfully",
        });
});

export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);
    if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }
    return clearAuthCookies(res).status(OK).json({
        message: "Logged out successfully",
    });
});

export const refreshHandler = catchErrors(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    appErrorAssert(refreshToken, UNAUTHORIZED, "Missing Refresh Token!");

    const { accessToken, refreshToken: newRefreshToken } =
        await refreshAccessToken(refreshToken);

    if (newRefreshToken) {
        res.cookie(
            "refreshToken",
            newRefreshToken,
            getRefreshTokenCookieOptions()
        );
    }

    return res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .status(OK)
        .json({
            message: "Access token refreshed successfully",
        });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);
    await verifyEmail(verificationCode);
    return res.status(OK).json({
        message: "Email verified successfully",
    });
});
