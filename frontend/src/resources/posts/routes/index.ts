import { isAuthenticated } from '@/resources/users/guards/auth.guards';
import type { RouteRecordRaw } from 'vue-router';

export const postRoutes: RouteRecordRaw[] = [
    {
        path: "/posts",
        name: "Posts",
        meta: {
            title: `Hola - Home`
        },
        beforeEnter: [isAuthenticated],
        component: () => import("../components/Post.vue")
    }
];