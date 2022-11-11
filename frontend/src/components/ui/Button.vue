<script setup lang="ts">
defineProps<{
    type?: "primary" | "danger";
    isLoading?: boolean;
}>();
</script>

<template>
    <button :class="type">
        <span v-if="isLoading">Chargement...</span>

        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>

<style scoped lang="scss">
button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    border: none;
    border-radius: var(--raduis);
    letter-spacing: 0.5px;
    transition: transform var(--transition-time);
    cursor: pointer;

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        cursor: not-allowed;
    }
}

.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.danger {
    background-color: var(--color-danger);
    color: var(--color-white);
}
</style>