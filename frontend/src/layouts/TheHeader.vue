<script setup lang="ts">
import { useUserStore } from '@/resources/users/store/user';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const userStore = useUserStore();
const router = useRouter();

async function logout() {
    try {
        await userStore.logout();
        router.push("Login");
    } 
    catch (error) {
        router.push("Login")
    }
}
</script>

<template>
    <header>
        <div class="logo">
            <h1>Hola</h1>
            <div id="point"></div>
        </div>
        
        <Button @click="logout" type="danger">déconnexion</Button>
    </header>
</template>

<style scoped lang="scss">
header {
	padding-inline: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
	box-shadow: var(--shadow);
    background-color: var(--t-color-background-2);
}

div.logo {
    display: flex;
    align-items: baseline;
    gap: 2px;

    h1 {
        color: var(--color-primary);
        font-size: 2.5rem;
        font-weight: bold;
    }

    #point {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: var(--color-primary);
        border-radius: 50%;
    }
}
</style>