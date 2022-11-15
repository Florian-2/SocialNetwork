<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useResizeObserver, useDropZone, useObjectUrl } from '@vueuse/core';
import { usePostStore } from '../store/post';
import type { CreatePost } from '../interfaces/post.interface';
import { useUserStore } from '@/resources/users/store/user';
import Notification from '@/components/ui/Notification.vue';
import Button from '@/components/ui/Button.vue';
import IconImages from '@/components/icons/IconImages.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconEmojiSmile from '@/components/icons/IconEmojiSmile.vue';
import IconSendMessage from '@/components/icons/IconSendMessage.vue';


const userStore = useUserStore();
const postStore = usePostStore();
const textarea = ref<HTMLTextAreaElement>();
const { isOverDropZone } = useDropZone(textarea, onDrop);
const limitOfCharactere = 300;

const inputText = ref<string>("");
const inputTextError = ref<string>("");

const inputFiles = ref<{ id: string, file: File, url: string }[]>([]);
const errorInputFile = ref<string>("");
const isModalOpen = ref(false);

onMounted(() => {
    window.addEventListener("drop", (e) => e.preventDefault());
    window.addEventListener("dragover", (e) => e.preventDefault());
});

useResizeObserver(textarea, () => autogrow());

function autogrow() {
    if (textarea.value) {
        textarea.value.style.height = "auto";
        textarea.value.style.height = textarea.value.scrollHeight + 2 + "px";
    }
}

const availableMimeType = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
];

watch(inputFiles.value, () => {
    if (inputFiles.value) {
        for (const { id, file } of inputFiles.value) {
            if (!availableMimeType.includes(file.type)) {
                deleteFile(id);
                errorInputFile.value = "Seuls les fichiers png, jpg et webp sont supportés";
                isModalOpen.value = true;
            }
        }
    }
});

watch(inputText, () => {
    if (inputText.value.length > limitOfCharactere)
        inputTextError.value = `${limitOfCharactere} caractères maximum`;
    else 
        inputTextError.value = "";
});

function onDrop(files: File[] | null) {   
    if (files) {
        for (const file of files) {
            addFile(file);
        }
    }
}

function onChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (input.files) {
        for (const file of input.files) {
            addFile(file);
        }

        input.files = null;
    }
}

function addFile(file: File): void {
    if (inputFiles.value.length >= 2) {
        errorInputFile.value = "Vous êtes limité à 2 images par post";
        isModalOpen.value = true;
        return;
    }

    const url = useObjectUrl(file);
    inputFiles.value.push({ file, url: url.value || "", id: crypto.randomUUID() });
}

function deleteFile(id: string): void {
    const index = inputFiles.value.findIndex((file) => file.id === id);
    inputFiles.value.splice(index, 1);
}

const closeModal = () => isModalOpen.value = !isModalOpen.value;

async function onSubmit() {
    const images: File[] = inputFiles.value.map((obj) => obj.file);

    const formData: CreatePost = {
        message: inputText.value,
        images: images
    }

    try {
        if (!inputTextError.value) {
            await postStore.createPost(formData);
        }
    } 
    catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <Notification v-if="isModalOpen" @close="closeModal" :duration="5000">
                <p>{{ errorInputFile }}</p>
            </Notification>
        </Transition>
    </Teleport>

    <div class="create-post-container">
        <div class="thumbnail">
            <img :src="userStore.currentUser?.thumbnail" alt="avatar">
        </div>

        <div class="create-post-content">
            <div class="post">
                <textarea 
                    ref="textarea" 
                    v-model="inputText" 
                    name="post" id="post" 
                    placeholder="Quoi de neuf ?"
                    :class="{ 'active-dropzone': isOverDropZone }" 
                    @input="autogrow" 
                    @focus="autogrow"
                ></textarea>

                <div class="information">
                    <span v-if="inputTextError" class="error error-message">{{ inputTextError }}</span>

                    <span v-if="inputText.length > 0" :class="['character-counter', { 'error': inputTextError }]">
                        {{ inputText.length }}/{{ limitOfCharactere }}
                    </span>
                </div>

                <div v-if="inputFiles.length > 0" class="box-images">
                    <div class="item-image" v-for="{ id, file, url } of inputFiles" :key="id">
                        <img :src="url" :alt="file.name" draggable="false">

                        <Button @click="deleteFile(id)">
                            <IconClose color="#fff" />
                        </Button>
                    </div>
                </div>
            </div>

            <div class="options-container">
                <div class="option opt-images" role="button">
                    <label for="files">
                        <IconImages />
                        Images
                    </label>

                    <input 
                        type="file"
                        name="files" id="files" 
                        @change="onChange"  
                        multiple
                        :accept="availableMimeType.join(', ')"
                    >
                </div>

                <div class="option opt-emoji" role="button">
                    <IconEmojiSmile />
                    <p>Emojis</p>
                </div>

                <Button type="primary" @click="onSubmit">
                    <IconSendMessage />
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.create-post-container {
    padding: 1rem;
    display: flex;
    gap: 2rem;
    box-shadow: var(--shadow);
    border-radius: calc(var(--raduis) * 4);
    background-color: var(--t-color-background-2);

    .thumbnail {
        border-radius: 50%;
        overflow: hidden;
        min-width: 50px;
        height: 50px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .create-post-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .post {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            textarea {
                width: 100%;
                max-height: 300px;
                padding: 0.5rem;
                font-size: clamp(1.2rem, 2vw, 1.4rem);
                border-radius: calc(var(--raduis) * 2);
                border: 1px solid var(--t-color-border);
                outline: none;
                resize: none;

                &:focus {
                    border-color: var(--t-color-border-focus);
                }

                &.active-dropzone {
                    border-color: var(--t-color-border-focus);
                    background-color: var(--color-hover);
                }
            }

            .information {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 1.2rem;

                .character-counter {
                    margin-left: auto;
                }

                .error {
                    color: var(--color-danger);
                }
            }
            
            .box-images {
                display: flex;
                justify-content: flex-start;
                gap: 1.5rem;

                .item-image {
                    position: relative;

                    img {
                        max-width: 150px;
                        border-radius: calc(var(--raduis) * 2);
                        overflow: hidden;
                        object-fit: cover;
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
        }

        .options-container {
            display: flex;
            justify-content: center;
            gap: 1rem;

            .option {
                padding: 0.5rem;
                display: flex;
                align-items: center;
                flex-grow: 1;
                gap: 0.5rem;
                border-radius: var(--raduis);
                transition: background-color var(--transition-time);
                cursor: pointer;

                &:hover {
                    background-color: var(--color-hover);
                }

                svg {
                    width: 20px;
                    min-width: 20px;
                }
            }

            .opt-images {
                label {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                }

                input {
                    display: none;
                }
            }
        }
    }
}
</style>