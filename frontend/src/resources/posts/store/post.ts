import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import PostSevices from '../services/post.services';
import type { CreatePost, Post } from '../interfaces/post.interface';


export const usePostStore = defineStore('post', () => {
    // State
    const posts = ref<Post[]>([]);
    const fetch = reactive<{
        isLoading: boolean;
        error: any;
    }>({
        isLoading: false,
        error: null
    });
    const pagination = reactive({
        currentPage: 1,
        resultsPerPage: 5,
        moreResults: true
    });

    // Actions
    async function createPost(data: CreatePost) {
        try {
            const formData = new FormData();
            formData.append("message", data.message);
            data.images.forEach((image) => formData.append("image", image));

            const post = await PostSevices.createPost(formData);
            posts.value?.push(post);
        } 
        catch (error) {
            throw error;
        }
    }

    async function getPosts() {
        try {
            if (pagination.moreResults) {
                fetch.isLoading = true;

                const { posts: data, pagination: pages } = await PostSevices.getPosts(pagination.currentPage, pagination.resultsPerPage);

                if (pages.totalPages === pagination.currentPage) {
                    pagination.moreResults = false;
                }

                if (pages.totalPages > pagination.currentPage) {
                    pagination.currentPage++;
                }

                posts.value.push(...data);
            }
            else {
                console.log("plus de posts");
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            fetch.isLoading = false;
        }
    }

    async function deletePost(id: string) {
        try {
            const index = posts.value.findIndex((post) => post._id === id);
            posts.value?.splice(index, 1);
            await PostSevices.deletePost(id);
        } 
        catch (error) {
            throw error;
        }
    }

    return {
        posts,
        fetch,
        pagination,
        createPost,
        getPosts,
        deletePost
    }
});