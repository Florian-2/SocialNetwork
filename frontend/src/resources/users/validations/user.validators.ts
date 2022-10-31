import { z } from "zod";

export const pseudo = z.string({ required_error: "form.error.pseudo_require" }).trim().min(3, "form.error.pseudo");
export const email = z.string({ required_error: "form.error.email_require" }).trim().email("form.error.email");
export const passwordWithRules = z.string({ required_error: "form.error.password_require" }).trim().min(8, "form.error.password");
export const password = z.string({ required_error: "form.error.password_require" }).trim().min(1, "form.error.password_require");
export const confirmPassword = z.string({ required_error: "form.error.confirmPassword_require" }).trim().min(1, "form.error.confirmPassword");