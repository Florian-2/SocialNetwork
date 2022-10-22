import { createRouter, createWebHistory } from 'vue-router';
import { postRoutes } from '@/resources/posts/routes';
import { userRoutes } from '@/resources/users/routes';
import HomeView from '@/views/HomeView.vue';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			alias: "/home",
			name: "home",
			component: HomeView
		},
		...postRoutes,
		...userRoutes
	]
});

export default router;