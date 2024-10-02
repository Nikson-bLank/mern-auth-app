import { NextFunction, Request, Response } from "express";

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

function catchErrors(controller: AsyncController): AsyncController {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

export default catchErrors;