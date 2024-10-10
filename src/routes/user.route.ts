import { Router } from "express";
import { userHandler } from "../controllers/user.controller";

const userRoutes = Router();

// prefix : user

userRoutes.get("/", userHandler);

export default userRoutes;
