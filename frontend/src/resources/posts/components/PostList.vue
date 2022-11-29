<script setup lang="ts">
import { useUserStore } from '@/resources/users/store/user';
import { usePostStore } from '../store/post';
import PostCard from './PostCard.vue';
import PostSkeleton from './ui/PostSkeleton.vue';


const postsStore = usePostStore();
const userStore = useUserStore();

// init fetch
if (postsStore.posts.length === 0) {
    postsStore.getPosts();
}
</script>

<template>
    <section>
        <PostCard 
            v-for="post in postsStore.posts" :key="post._id"
            :post="post" 
            :user_id="userStore.currentUser?._id!"
            @delete-post="postsStore.deletePost($event)"
        />

        <PostSkeleton v-if="postsStore.fetch.isLoading" :skeletons="3"/>
    </section>
</template>