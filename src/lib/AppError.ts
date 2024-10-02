import AppErrorCode from "../const/appErrorCode";
import { HttpStatusCode } from "../const/http";

class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCode
    ) {
        super(message);
    }
}

export default AppError;
