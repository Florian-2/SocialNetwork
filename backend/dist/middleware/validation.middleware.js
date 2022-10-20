"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationFormData(schema) {
    return async (req, res, next) => {
        try {
            schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ error });
        }
    };
}
exports.default = validationFormData;
