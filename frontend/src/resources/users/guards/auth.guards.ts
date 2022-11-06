import { useUserStore } from '../store/user';

export function isAuthenticated() {
    const userStore = useUserStore();
    if (!userStore.currentUser) {
        return "/login";
    }
}

export function isNotAuthenticated() {
    const userStore = useUserStore();
    if (userStore.currentUser) {
        return "/profile";
    }
}