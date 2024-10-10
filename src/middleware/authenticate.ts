import { RequestHandler } from "express";

import { verifyToken } from "../utils/jwt";
import appErrorAssert from "../utils/appErrorAssert";
import { UNAUTHORIZED } from "../const/http";
import AppErrorCode from "../const/appErrorCode";

const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appErrorAssert(
        accessToken,
        UNAUTHORIZED,
        "Not authorized",
        AppErrorCode.InvalidAccessToken
    );

    const { error, payload } = verifyToken(accessToken);
    appErrorAssert(
        payload,
        UNAUTHORIZED,
        error === "jwt expired" ? "Token expired" : "Invalid token",
        AppErrorCode.InvalidAccessToken
    );

    req.userId = payload.userId as any;
    req.sessionId = payload.sessionId as any;

    next();
};

export default authenticate;
