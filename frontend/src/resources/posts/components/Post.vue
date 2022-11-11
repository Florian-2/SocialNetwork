<script setup lang="ts">
import PostCreate from './PostCreate.vue';


</script>

<template>
    <div class="post-layout">
        <div class="posts">
            <PostCreate/>

            <!-- posts... -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.post-layout {
    height: 100%;
  	display: grid;
	grid-template-columns: minmax(100px, 250px) 1fr minmax(100px, 250px);

    .posts {
        grid-column: 2 / 3;
    }
}
</style>