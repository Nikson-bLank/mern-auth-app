import dayjs from "dayjs";
import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createAt: Date;
    expiresAt: Date;
}

const SessionSchema = new mongoose.Schema<SessionDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: {
        type: String,
    },
    createAt: {
        type: Date,
        required: true,
        default: dayjs(),
    },
    expiresAt: { type: Date, required: true, default: dayjs().add(30, "days") },
});

const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);

export default SessionModel;
