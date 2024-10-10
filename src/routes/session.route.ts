import { Router } from "express";
import {
    sessionHandler,
    deleteSessionHandler,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.get("/", sessionHandler);
sessionRoutes.delete("/:sessionId", deleteSessionHandler);

export default sessionRoutes;
