<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    toggle: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void
}>();

const isMobile = ref(false);

if(/Mobi|Android/i.test(navigator.userAgent)) {
    isMobile.value = true;
}
</script>

<template>
    <Teleport to="body" :disabled="isMobile">
        <div v-if="toggle && !isMobile" @click="emit('close')">
            <div @click.stop class="modal">
                <slot></slot>
                <button @click.stop="emit('close')">Fermer</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    left: 50%;
    top: 35%;
    z-index: 999;
    transform: translate(-50%, -25%);

    width: 250px;
    padding: 1.5rem;
    background-color: var(--t-color-background-2);
    border-radius: var(--raduis);
    box-shadow: var(--shadow)
}
</style>