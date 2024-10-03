import { Response, CookieOptions } from "express";
import { NODE_ENV } from "../const/env";
import dayjs from "dayjs";

export const REFRESH_PATH = "/auth/refresh";

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: dayjs().add(15, "minutes").toDate(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: dayjs().add(30, "days").toDate(),
    path: REFRESH_PATH,
});

type AuthCookieParam = {
    res: Response;
    accessToken: string;
    refreshToken: string;
};

export const setAuthCookies = ({
    res,
    accessToken,
    refreshToken,
}: AuthCookieParam) => {
    return res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
    return res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: REFRESH_PATH,
    });
};
