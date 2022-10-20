import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from "zod";

function validationFormData(schema: ZodSchema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            schema.parseAsync(req.body);
            next();
        } 
        catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
    }
}

export default validationFormData;