import { Router } from "express";
import {
    sendResetPasswordMailHandler,
    loginHandler,
    logoutHandler,
    refreshHandler,
    registerHandler,
    verifyEmailHandler,
    resetPasswordHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendResetPasswordMailHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

// prefix: auth
export default authRoutes;
