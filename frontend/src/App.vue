<script lang="ts" setup>
import { useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";
import { RouterView } from "vue-router"
import TheHeader from "./layouts/TheHeader.vue"
import { usePostStore } from "./resources/posts/store/post";
import { useUserStore } from "./resources/users/store/user";

const userStore = useUserStore();
const postsStore = usePostStore();

const scroll = ref<HTMLElement>();

useInfiniteScroll(
    scroll,
    () => {
		if (!postsStore.fetch.isLoading) {
			postsStore.getPosts();
		}
	},
    { distance: 10 }
);
</script>

<template>
	<div class="scroll" ref="scroll">
		<TheHeader v-if="userStore.isAuthenticated" />

		<main>
			<RouterView />
		</main>
	</div>
</template>

<style scoped>
.scroll {
	max-height: 100vh;
	overflow: auto;
}
</style>