import { Request, Response } from "express"

export const validateRequestBody = (req: Request, res: Response, next: CallableFunction) => {
    const body: Object = req.body;

    if (body === undefined) {
        res.status(400).json(JSON.stringify({
            message: 'Not body error'
        }));
    } else {
        next();
    }
};
