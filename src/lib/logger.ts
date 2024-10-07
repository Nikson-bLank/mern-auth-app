import dayjs from "dayjs";
import { createLogger, transports, format } from "winston";


const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${dayjs(timestamp).format()}]  ${level}: ${message}`;
        })
    ),
});

export default logger;
