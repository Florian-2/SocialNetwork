import { z } from "zod";

export const register = z.object({
    pseudo: z.string().min(2),
    email: z.string().trim().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "La confirmation du mot de passe a échoué"
});

export default { register };