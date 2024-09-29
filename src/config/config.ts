import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

export const config = {
    mongo: { url: MONGO_URI },
    server: { port: SERVER_PORT },
};
