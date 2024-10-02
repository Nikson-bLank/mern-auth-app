import mongoose from "mongoose";
import VerificationCodeType from "../const/verificationCodeTypes";

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    createAt: Date;
    expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    type: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
    "VerificationCode",
    verificationCodeSchema,
    "verification_codes"
);

export default VerificationCodeModel;
