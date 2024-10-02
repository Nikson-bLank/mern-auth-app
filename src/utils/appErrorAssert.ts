import assert from "node:assert";
import AppErrorCode from "../const/appErrorCode";
import { HttpStatusCode } from "../const/http";
import AppError from "../lib/AppError";

type AppErrorAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */

const appErrorAssert: AppErrorAssert = (
    condition,
    httpStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appErrorAssert;
