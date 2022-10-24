import { z } from "zod";


export const createComment = z.object({
    message: z.string().trim().min(1, "1 caractère minimum").max(250, "250 caractères maximum")
});