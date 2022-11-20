<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';
import Button from '@/components/ui/Button.vue';

const props = defineProps<{
    duration: number;
}>();

const emit = defineEmits<{
    (e: 'close'): void
}>();

const closeModalTimeout = setTimeout(() => emit('close'), props.duration);

onMounted(() => closeModalTimeout);
onUnmounted(() => clearInterval(closeModalTimeout));
</script>

<template>
    <div class="modal" @click.stop>
        <slot></slot>

        <Button class="close" @click.stop="emit('close')">
            <IconClose/>
        </Button>
    </div>
</template>

<style scoped>
.modal {
    width: 250px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;   
    gap: 0.5rem;
    font-size: 1.3rem;
    
    position: absolute;
    left: 20px;
    top: 10%;
    z-index: 999;

    background-color: var(--t-color-background-2);
    border-radius: var(--raduis);
    border: 1px solid var(--color-danger);
    box-shadow: var(--shadow);
}

.close {
    border-radius: 50%;
    width: 25px;
    height: 25px;
}

.modal-enter-active,
.modal-leave-active {
    transition: all var(--transition-time) ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from, 
.modal-leave-to{
    transform: translateX(-100px);
}
</style>