<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import IconEllipsis from '@/components/icons/IconEllipsis.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import type { Post } from '../interfaces/post.interface';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEye from '@/components/icons/IconEye.vue';
import { useRelativeTime } from '@/composables/useRelativeTime';
import IconReport from '@/components/icons/IconReport.vue';
import Dropdown from '@/components/ui/Dropdown.vue';


const props = defineProps<{
    post: Post;
    user_id: string;
}>();

const emit = defineEmits<{
    (e: "delete-post", id: string): void
}>();

const { time } = useRelativeTime(props.post.createdAt);

const btnShowOptionsRef = ref<HTMLButtonElement>();
const showOptions = ref(false);
const toggleShowOptions = () => showOptions.value = !showOptions.value;
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
                <Button ref="btnShowOptionsRef" class="toggle-dropdown" @click.stop="toggleShowOptions">
                    <IconEllipsis/>
                </Button>

                <Dropdown v-if="showOptions" :ignore-element="btnShowOptionsRef" @close="showOptions = false">
                    <button class="action">
                        <IconEye/>
                        <span>Voir</span>
                    </button>

                    <button class="action">
                        <IconReport/>
                        <span>Signaler</span>
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
                </Dropdown>
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

            .toggle-dropdown {
                padding: 0;
                background: none;
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
            max-height: 400px;

            .image {
                flex-basis: 50%;
                border-radius: 8px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%; 
                    object-fit: cover;
                }
            }
        }
    }
}
</style>