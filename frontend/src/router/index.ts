import { createRouter, createWebHistory } from 'vue-router';
import { postRoutes } from '@/resources/posts/routes';
import { userRoutes } from '@/resources/users/routes';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...postRoutes,
		...userRoutes
	]
});

router.afterEach((to) => {
	const title = to.meta.title as string;
	document.title = title;
});

export default router;