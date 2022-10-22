"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationFormData(schema) {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (e) {
            const err = e;
            const formatZodError = [];
            for (const e of err.issues) {
                formatZodError.push({
                    field: e.path[0],
                    message: e.message
                });
            }
            res.status(400).send({ errors: formatZodError });
        }
    };
}
exports.default = validationFormData;
