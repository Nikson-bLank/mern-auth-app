import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { SessionDocument } from "../models/session.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../const/env";

type AccessTokenPayload = {
    userId: UserDocument["_id"];
    sessionId: SessionDocument["_id"];
};

export type RefreshTokenPayload = {
    sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
    secret: string;
};

const defaults: SignOptions = {
    audience: ["user"],
};

export const accessTokenOptions: SignOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_SECRET,
};

export const refreshTokenOptions: SignOptionsAndSecret = {
    expiresIn: "30d",
    secret: JWT_REFRESH_SECRET,
};

export const signToken = (
    payload: AccessTokenPayload | RefreshTokenPayload,
    options?: SignOptionsAndSecret
) => {
    const { secret, ...signOptions } = options || accessTokenOptions;
    return jwt.sign(payload, secret, { ...defaults, ...signOptions });
};

type VerifyOptionsAndSecret = VerifyOptions & {
    secret: string;
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
    token: string,
    options?: VerifyOptionsAndSecret
) => {
    const { secret = JWT_SECRET, ...verifyOptions } = options || {};

    try {
        const payload = jwt.verify(token, secret, {
            ...defaults,
            ...verifyOptions,
        }) as TPayload;
        return { payload };
    } catch (error: any) {
        return { error: error.message };
    }
};
