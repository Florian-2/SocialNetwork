<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from "@vueuse/core"

const props = defineProps<{
    ignoreElement?: HTMLElement
}>();

const emit = defineEmits<{
    (e: 'close'): void
}>();

const dropdown = ref<HTMLDivElement>();
onClickOutside(dropdown, () => emit('close'), { ignore: [props.ignoreElement] });
</script>

<template>
    <div ref="dropdown" class="dropdown">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.dropdown {
    position: absolute;
    right: 0;
    z-index: 999;
    padding: 0.5rem;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    box-shadow: var(--shadow);
    border-radius: calc(var(--raduis) * 2);
    overflow: hidden;

    :slotted(button) {
        padding: 0;
        background: none;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 1rem;
        border-radius: var(--raduis);
        border: none;
        cursor: pointer;
        transition: all var(--transition-time);

        span {
            font-weight: 500;
            font-family: 'Poppins', sans-serif;
        }

        svg {
            width: 20px;
            transition: all var(--transition-time);
        }

        &.action:hover {
            background-color: var(--color-hover);
        }

        &.delete, &.logout {
            color: var(--color-danger);

            svg {
                fill: var(--color-danger);
            }
        }
    }
}
</style>