import { z } from "zod";
import UserService from "./user.service";

export const register = z.object({
    pseudo: z.string().min(2).max(50),
    email: z.string().trim().email(),
    language: z.string().min(2),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "La confirmation du mot de passe a échoué"
}).refine(async (data) => {
    try {
        const userService = new UserService();
        await userService.getUserByEmail(data.email);
        return false; // L'utilisateur existe déjà
    } 
    catch (error) {
        return true; // L'utilisateur n'existe pas encore donc c'est OK
    }
}, {
    path: ["email"],
    message: "Adresse mail déjà utilisée"
});


export const login = z.object({
    email: z.string().trim().email(),
    password: z.string()
});

export default { register };