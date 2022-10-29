import fs from "fs/promises";
import { Image } from "@/resources/post/post.interface";

export function deleteManyFiles(files: Image[]) {
    const arrayOfpromises = files.map(async (file) => {
        await fs.unlink(`${file.absolutePath}`).catch((err) => console.log(err));
    });

    return arrayOfpromises;
}