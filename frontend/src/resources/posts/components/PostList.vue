<script setup lang="ts">
import { useUserStore } from '@/resources/users/store/user';
import { usePostStore } from '../store/post';
import PostCard from './PostCard.vue';
import PostSkeleton from './ui/PostSkeleton.vue';

const postsStore = usePostStore();
const userStore = useUserStore();
postsStore.getPosts();
// if (postsStore.posts.length === 0) {
//     postsStore.getPosts();
// }
</script>

<template>
    <PostSkeleton v-if="postsStore.fetch.isLoading" :cards="3"/>

    <section v-else>
        <PostCard 
            v-for="post in postsStore.posts" :key="post._id"
            :post="post" 
            :user_id="userStore.currentUser?._id!"
            @delete-post="postsStore.deletePost($event)"
        />
    </section>
</template>

<style scoped>

</style>