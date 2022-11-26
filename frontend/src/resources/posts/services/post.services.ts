import axios from "axios";
import type { Post } from "../interfaces/post.interface";

export async function createPost(formData: FormData): Promise<Post> {
    try {
        const post = await axios.post("/api/posts/create", formData);        
        return post.data;
    }
    catch (error) {
        throw error;
    }
}

export async function getPosts(): Promise<Post[]> {
    try {
        const post = await axios.get("/api/posts");
        return post.data.posts;
    }
    catch (error) {
        throw error;
    }
}

export async function deletePost(id: string): Promise<Post[]> {
    try {
        const post = await axios.delete(`/api/posts/delete/${id}`);
        console.log(post);
        
        return post.data
    }
    catch (error) {
        throw error;
    }
}

export default { 
    createPost,
    getPosts,
    deletePost
};