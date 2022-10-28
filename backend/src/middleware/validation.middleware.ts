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
            const formatZodError: { field: string, message: string }[] = [];

            for (const e of err.issues) {
                formatZodError.push({
                    field: e.path[0] as string,
                    message: e.message
                });
            }
                      
            res.status(400).send({ errors: formatZodError });
        }
    }
}

export default validationFormData;