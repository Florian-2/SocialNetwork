import { z } from "zod";
import UserService from "./user.service";

export const register = z.object({
    pseudo: z.string({ required_error: "form.error.pseudo_require" }).min(2, "form.error.pseudo_min").max(50, "form.error.pseudo_max"),
    email: z.string({ required_error: "form.error.email_require" }).trim().email("form.error.email"),
    language: z.string().min(2).optional(),
    password: z.string({ required_error: "form.error.password_require" }).min(8, "form.error.password"),
    confirmPassword: z.string({ required_error: "form.error.confirmPassword_require" }).min(8, "form.error.confirmPassword")
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "form.error.confirmPassword"
})
.refine(async (data) => {
    try {
        const userService = new UserService();
        return !(await userService.userExist("email", data.email)); // L'utilisateur existe déjà
    } 
    catch (error) {
        return true; // L'utilisateur n'existe pas encore donc c'est OK
    }
}, {
    path: ["email"],
    message: "form.error.email_already_used"
})
.refine(async (data) => {
    try {
        const userService = new UserService();
        return !(await userService.userExist("pseudo", data.pseudo));
    } 
    catch (error) {
        return true;
    }
}, {
    path: ["pseudo"],
    message: "form.error.pseudo_already_used"
});


export const login = z.object({
    email: z.string({ required_error: "form.error.email_require" }).trim().min(1, "form.error.email_require").email("form.error.email"),
    password: z.string({ required_error: "form.error.password_require" }).min(1, "form.error.password_require")
});

export default { register };