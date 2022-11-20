<script setup lang="ts">
import type { Picture } from '../../types/Picture';
import Button from '@/components/ui/Button.vue';
import IconClose from '@/components/icons/IconClose.vue';

defineProps<{
    images: Picture[]
}>();

const emit = defineEmits<{
    (e: "delete-file", id: string): void
}>();
</script>

<template>
    <div v-if="images.length > 0" class="box-images">
        <div class="item-image" v-for="{ id, file, url } of images" :key="id">
            <img :src="url" :alt="file.name" draggable="false">

            <Button @click="emit('delete-file', id)">
                <IconClose color="#fff" />
            </Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box-images {
    display: flex;
    justify-content: flex-start;
    gap: 1.5rem;

    .item-image {
        position: relative;
        flex-basis: 50%;

        img {
            width: 100%;
            height: 100%;
            border-radius: calc(var(--raduis) * 2);
        }

        button {
            padding: 0;
            position: absolute;
            right: 5px;
            top: 5px;
            border-radius: 50%;
            background-color: hsla(0, 0%, 0%, 0.65);
        }
    }
}
</style>