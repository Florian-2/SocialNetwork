<script lang="ts" setup>
import { RouterView } from "vue-router"
import TheHeader from "./layouts/TheHeader.vue"
import { useUserStore } from "./resources/users/store/user";

const userStore = useUserStore();
</script>

<template>
	<TheHeader v-if="userStore.isAuthenticated" />

	<main>
		<RouterView />
	</main>
</template>