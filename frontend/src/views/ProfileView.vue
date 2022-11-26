<script setup lang="ts">import { useUserStore } from '@/resources/users/store/user';

const userStore = useUserStore();

</script>

<template>
    <pre>{{ userStore.currentUser }}</pre>
</template>

<style scoped>
pre {
    font-size: 1.5rem;
    line-height: 2.5rem;
}
</style>