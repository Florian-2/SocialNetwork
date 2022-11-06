import { translateTitle } from '@/i18n';

import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import { isAuthenticated, isNotAuthenticated } from '../guards/auth.guards';



export const userRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: () => { 
            return { path: "/login" }
        }
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: `Hola - ${translateTitle("title_page.login")}`
        },
        beforeEnter: [isNotAuthenticated],
        component: LoginView
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: `Hola - ${translateTitle("title_page.register")}`
        },
        beforeEnter: [isNotAuthenticated],
        component: () => import('@/views/RegisterView.vue')
    },
    {
        path: "/profile",
        name: "Profile",
        meta: {
            title: `Hola - ${translateTitle("title_page.profile")}`
        },
        beforeEnter: [isAuthenticated],
        component: () => import("@/views/ProfileView.vue")
    }
];