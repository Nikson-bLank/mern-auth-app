import { MONGO_URI } from "../const/env";
import logger from "../lib/logger";
import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("DB connected successfully");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

export default connectDB;
