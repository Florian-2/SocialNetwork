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

export async function getPosts(page: number, limit: number): Promise<{ 
    posts: Post[], 
    pagination: { totalPages: number, currentPage: number } 
}> {
    try {
        const query = new URLSearchParams();
        query.append("limit", limit.toString());
        query.append("page", page.toString());

        const res = await axios.get(`/api/posts?${query}`);

        return {
            posts: res.data.posts, 
            pagination: { 
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage
            } 
        };
    }
    catch (error) {
        throw error;
    }
}

export async function deletePost(id: string): Promise<Post[]> {
    try {
        const post = await axios.delete(`/api/posts/delete/${id}`);
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