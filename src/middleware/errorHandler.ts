import {
    // ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from "express";
import logger from "../lib/logger";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../const/http";
import z, { ZodError } from "zod";
import AppError from "../lib/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookie";

export type ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => any;

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
};

const handleZodError = (res: Response, error: ZodError) => {
    const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors,
    });
};

const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(`PATH:${req.path}`, error);

    if (req.path === REFRESH_PATH) {
        clearAuthCookies(res);
    }

    if (error instanceof z.ZodError) {
        return handleZodError(res, error);
    }

    if (error instanceof AppError) {
        return handleAppError(res, error);
    }

    return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error!");
};

export default errorHandler;
