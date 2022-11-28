<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/resources/users/store/user';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconProfile from '@/components/icons/IconProfile.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import IconAngleDown from '@/components/icons/IconAngleDown.vue';
import IconAngleUp from '@/components/icons/IconAngleUp.vue';
import IconSearch from '@/components/icons/IconSearch.vue';


const userStore = useUserStore();
const router = useRouter();

const buttonShowDropdownRef = ref<HTMLElement>();
const showDropdown = ref(false);
const toggleShowDropdown = () => showDropdown.value = !showDropdown.value;

async function logout() {
    try {
        await userStore.logout();
        router.push("Login");
    } 
    catch (error) {
        router.push("Login");
    }
}

const toProfile = () => {
    showDropdown.value = false;
    router.push({ name: "Profile" });
};
</script>

<template>
    <header>
        <div class="container">
            <div class="logo">
                <h1>Hola</h1>
                <div id="point"></div>
            </div>

            <div class="container-actions">
                <div class="box-input">
                    <IconSearch/>
                    <input type="text" name="search" placeholder="Chercher vos futurs amis">
                </div>

                <div class="actions">
                    <div class="box-profile">
                        <div class="thumbnail">
                            <img :src="userStore.currentUser?.thumbnail" alt="avatar">
                        </div>

                        <Button ref="buttonShowDropdownRef" @click="toggleShowDropdown" class="toggle">
                            <IconAngleUp v-if="showDropdown"/>
                            <IconAngleDown v-else />
                        </Button>
                    </div>

                    <Dropdown 
                        v-if="showDropdown" 
                        @close="showDropdown = false" 
                        :ignore-element="buttonShowDropdownRef"
                        class="user-menu"
                    >
                        <button class="action profile" @click="toProfile">
                            <IconProfile/>
                            <span>Profil</span>
                        </button>

                        <button class="action logout" @click="logout">
                            <IconLogout/>
                            <span>Me déconnecter</span>
                        </button>
                    </Dropdown>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    min-height: 60px;
	box-shadow: var(--shadow);
    background-color: var(--t-color-background-2);

    .container {
        height: 100%;
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-inline: 1rem;
    }

    .container-actions {
        display: flex;
        align-items: center;
        gap: 5rem;

        .box-input {
            height: 35px;
            min-width: 100px;
            padding-left: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            background-color: var(--color-hover);
            border-radius: calc(var(--raduis) * 2);

            input {
                height: 100%;
                width: 100%;
                padding-right: 1rem;
                font-size: 1.3rem;
                border: none;
                background: none;
                outline: none;
            }
        }

        .actions {
            position: relative;

            .thumbnail {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 40%;
                overflow: hidden;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }

            .box-profile {
                display: flex;
                align-items: center;
                gap: 0.3rem;

                .toggle {
                    background: none;
                    padding: 0.2rem;
                }
            }

            .user-menu {
                margin-top: 1rem;
                min-width: 200px;
            }
        }
    }

    .logout {
        background: none;
    }
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