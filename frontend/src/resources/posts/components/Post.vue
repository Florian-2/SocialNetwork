<script setup lang="ts">
import PostCreate from './PostCreate.vue';


</script>

<template>
    <div class="post-layout">
        <div class="test-1 item"></div>

        <div class="posts">
            <PostCreate/>

            <!-- posts... -->
        </div>

        <div class="test-2 item"></div>
    </div>
</template>

<style scoped lang="scss">
.post-layout {
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-inline: 1rem;
    
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;

    .posts {
        flex-basis: max(600px); 
        flex-grow: 1;
        // flex-shrink: 0;
    }

    .item {
        min-width: 100px;
        max-height: 500px;
        background-color: white;
        border-radius: 10px;
        flex-grow: 1;
        box-shadow: var(--shadow);
    }
}
</style>