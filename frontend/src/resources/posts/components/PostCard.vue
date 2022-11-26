<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from "@vueuse/core"
import Button from '@/components/ui/Button.vue';
import IconEllipsis from '@/components/icons/IconEllipsis.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import type { Post } from '../interfaces/post.interface';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEye from '@/components/icons/IconEye.vue';
import { useRelativeTime } from '@/composables/useRelativeTime';


const props = defineProps<{
    post: Post;
    user_id: string;
}>();

const emit = defineEmits<{
    (e: "delete-post", id: string): void
}>();

const { time } = useRelativeTime(props.post.createdAt);

const optionsRef = ref<HTMLDivElement>();
const btnShowOptionsRef = ref<HTMLButtonElement>();
const showOptions = ref(false);
const toggleShowOptions = () => showOptions.value = !showOptions.value;
onClickOutside(optionsRef, () => showOptions.value = false, { ignore: [btnShowOptionsRef] });
</script>

<template>
    <article class="card-post">
        <header>
            <div class="user">
                <div class="thumbnail">
                    <img :src="post.author.thumbnail" alt="avatar">
                </div>

                <div class="infos">
                    <p class="pseudo">{{ post.author.pseudo }}</p>
                    <p class="date">{{ time }}</p>
                </div>
            </div>

            <div class="box-options">
                <Button ref="btnShowOptionsRef" @click.stop="toggleShowOptions">
                    <IconEllipsis/>
                </Button>

                <div ref="optionsRef" v-if="showOptions" class="options">
                    <button class="action">
                        <IconEye/>
                        <span>Voir</span>
                    </button>

                    <template v-if="user_id === post.author._id">
                        <button class="action">
                            <IconEdit/>
                            <span>Modifier</span>
                        </button>

                        <button class="action delete" @click="emit('delete-post', post._id)">
                            <IconDelete/>
                            <span>Supprimer</span>
                        </button>
                    </template>
                </div>
            </div>
        </header>

        <main>
            <p class="message">{{ post.message }}</p>

            <div class="box-images">
                <div v-for="image of post.images" class="image">
                    <img :src="image.path" :alt="image.filename">
                </div>
            </div>
        </main>
    </article>
</template>

<style scoped lang="scss">
.card-post {
    padding: 2rem;
    margin-block: 2rem;
    background-color: var(--t-color-background-2);
    box-shadow: var(--shadow);
    border-radius: calc(var(--raduis) * 3);

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;

        .user {
            display: flex;
            align-items: center;
            gap: 1rem;

            .thumbnail {
                width: 50px;
                height: 50px;
                border-radius: 40%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .infos {
                .pseudo {
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .date {
                    font-size: 1.1rem;
                    color: #b0b0b0;
                }
            }
        }

        .box-options {
            position: relative;

            button {
                padding: 0;
                background: none;
            }

            .options {
                position: absolute;
                right: 0;
                min-width: 160px;
                display: flex;
                flex-direction: column;
                background-color: var(--color-white);
                border: 1px solid var(--t-color-border);
                border-radius: calc(var(--raduis) * 2);
                overflow: hidden;

                button {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all var(--transition-time);

                    span {
                        font-weight: bold;
                    }

                    svg {
                        width: 20px;
                        transition: all var(--transition-time);
                    }

                    &.action:hover {
                        background-color: var(--color-hover);
                    }

                    &.delete {
                        color: var(--color-danger);

                        svg {
                            fill: var(--color-danger);
                        }
                    }
                }
            }
        }
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .message {
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            white-space: pre-line;
        }

        .box-images {
            width: 100%;
            display: flex;
            gap: 1rem;

            .image {
                flex-basis: 50%;
                border-radius: 8px;
                // object-fit: cover;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>