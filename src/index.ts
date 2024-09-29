import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port: number = Number(process.env.PORT) || 4000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript + Node.js + Express!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
