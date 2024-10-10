import dayjs from "dayjs";
import { NOT_FOUND, OK } from "../const/http";
import SessionModel from "../models/session.model";
import catchErrors from "../utils/catchErrors";
import z from "zod";
import appErrorAssert from "../utils/appErrorAssert";

export const sessionHandler = catchErrors(async (req, res) => {
    const sessions = await SessionModel.find(
        { userId: req.userId, expiresAt: { $gt: dayjs() } },
        {
            _id: 1,
            userAgent: 1,
            createAt: 1,
        },
        {
            sort: { createAt: -1 }, //descending so that it return recent one
        }
    );
    const sessionsWithCurrent = sessions.map((session) => ({
        ...session.toObject(),
        ...(session.id === req.sessionId && { isCurrent: true }),
    }));
    return res.status(OK).json(sessionsWithCurrent);
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
    const sessionId = z.string().parse(req.params.sessionId);
    const deletedSession = await SessionModel.findOneAndDelete({
        _id: sessionId,
        userId: req.userId,
    });
    appErrorAssert(deletedSession, NOT_FOUND, "Session not found!");
    return res.status(OK).json({ message: "Removed session" });
});
