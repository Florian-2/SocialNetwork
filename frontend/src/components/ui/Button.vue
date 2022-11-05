<script setup lang="ts">
defineProps<{
    type?: "primary" | "danger";
}>();
</script>

<template>
    <button :class="type">
        <slot>button</slot>
    </button>
</template>

<style scoped>
button {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    padding: 1rem;
    border: none;
    border-radius: var(--raduis);
    letter-spacing: 0.5px;
    cursor: pointer;
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