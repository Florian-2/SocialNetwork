<script setup lang="ts">
import Loader from '@/components/ui/Loader.vue';
import { useUserStore } from '@/resources/users/store/user';
import { usePostStore } from '../store/post';
import PostCard from './PostCard.vue';

const postsStore = usePostStore();
const userStore = useUserStore();
postsStore.getPosts();
</script>

<template>
    <Loader v-if="postsStore.fetch.isLoading"/>

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