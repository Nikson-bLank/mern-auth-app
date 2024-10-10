import { NOT_FOUND, OK } from "../const/http";
import UserModel from "../models/user.model";
import appErrorAssert from "../utils/appErrorAssert";
import catchErrors from "../utils/catchErrors";

export const userHandler = catchErrors(async (req, res) => {
    const user = await UserModel.findById(req.userId);
    appErrorAssert(user, NOT_FOUND, "No user found!");
    return res.status(OK).json(user.omitPassword());
});
