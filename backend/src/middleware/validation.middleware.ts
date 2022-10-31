import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodError, ZodSchema } from "zod";

function validationFormData(schema: ZodSchema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // console.log(req.body);
            
            await schema.parseAsync(req.body);
            next();
        } 
        catch (e) {
            const err = e as ZodError;
            const formatZodError: { [key: string]: string } = {};

            for (const e of err.issues) {
                formatZodError[e.path[0]] = e.message
            }
                      
            res.status(400).send({ errors: formatZodError });
        }
    }
}

export default validationFormData;