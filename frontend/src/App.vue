<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import { useUserStore } from "./stores/user"

const userStore = useUserStore();
</script>

<template>
	<header>
		<h1>{{ userStore.user }}</h1>
		<h1>{{ userStore.isAuthenticated }}</h1>
		<button @click="userStore.login">login</button>
	</header>

	<RouterView />
</template>