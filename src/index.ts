import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import logger from "./lib/logger";
import connectDB from "./utils/connectDB";
import { APP_ORIGIN, NODE_ENV, PORT } from "./const/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./const/http";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";
import sessionRoutes from "./routes/session.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(OK).json({
        status: "healthy 👌",
    });
});

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    logger.info(`Server running on ${PORT} in ${NODE_ENV}`);
    await connectDB();
});
