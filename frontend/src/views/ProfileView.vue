<script setup lang="ts">
import { useUserStore } from '@/resources/users/store/user';

const userStore = useUserStore();
</script>

<template>
    <pre>{{ userStore.currentUser }}</pre>

    <RouterLink to="Login">login</RouterLink> 
    <br>
    <RouterLink to="Register">register</RouterLink>
</template>

<style scoped>
pre {
    font-size: 1.5rem;
}
</style>