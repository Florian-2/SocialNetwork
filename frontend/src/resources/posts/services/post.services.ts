import axios from "axios";
import type { Post } from "../interfaces/post.interface";

export async function createPost(formData: FormData): Promise<Post> {
    try {
        const post = await axios.post("/api/posts/create", formData);
        console.log(post);
        
        return post.data;
    }
    catch (error) {
        throw error;
    }
}

export default { createPost };