import getEnv from "../utils/getEnv";

export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT");
export const MONGO_URI = getEnv("MONGO_URI");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
