import { ref } from 'vue'
import { defineStore } from 'pinia'
import PostSevices from '../services/post.services';
import type { CreatePost, Post } from '../interfaces/post.interface';


export const usePostStore = defineStore('post', () => {
    // State
    const posts = ref<Post[]>([]);

    // Actions
    async function createPost(data: CreatePost) {
        try {
            const formData = new FormData();
            formData.append("message", data.message);
            data.images.forEach((image) => formData.append("image", image));

            const post = await PostSevices.createPost(formData);
            posts.value.push(post);
        } 
        catch (error) {
            throw error;
        }
    }

    return {
        posts,
        createPost
    }
});