import { translateTitle } from '@/i18n';

import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';



export const userRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: () => { 
            return { name: "Login" }
        }
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: `Hola - ${translateTitle("title_page.login")}`
        },
        component: LoginView
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: `Hola - ${translateTitle("title_page.register")}`
        },
        component: () => import('@/views/RegisterView.vue')
    }
];