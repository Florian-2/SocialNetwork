<script setup lang="ts">
defineProps<{
    sentence: string;
    limit: number;
}>();
</script>

<template>
    <div :class="['character-counter', { 'error': sentence.length > limit }]">
        <p>{{ sentence.length }}/{{ limit }}</p> 
    </div>
</template>

<style scoped lang="scss">
.character-counter {
    text-align: right;

    p {
        font-size: 1.1rem;
    }
}

.error {
    color: var(--color-danger);
}
</style>