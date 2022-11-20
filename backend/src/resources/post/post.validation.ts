import { z } from "zod";


export const createPost = z.object({
    message: z.string().max(300, "300 caractères maximum"),
});