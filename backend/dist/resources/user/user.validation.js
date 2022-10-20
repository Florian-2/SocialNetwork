"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const zod_1 = require("zod");
exports.register = zod_1.z.object({
    pseudo: zod_1.z.string().min(2),
    email: zod_1.z.string().trim().email(),
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "La confirmation du mot de passe a échoué"
});
exports.default = { register: exports.register };
