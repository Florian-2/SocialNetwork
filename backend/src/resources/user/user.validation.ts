import { z } from "zod";

export const register = z.object({
    pseudo: z.string().min(2).max(50),
    email: z.string().trim().email(),
    language: z.string().min(2),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "La confirmation du mot de passe a échoué"
});

export const login = z.object({
    email: z.string().trim().email(),
    password: z.string()
});

export default { register };