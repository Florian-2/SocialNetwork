<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useResizeObserver, useDropZone, useObjectUrl, useEventListener, onClickOutside } from '@vueuse/core';
import { usePostStore } from '../store/post';
import { useUserStore } from '@/resources/users/store/user';
import { AVAILABLE_MIMETYPE, MAX_SIZE_PICTURE } from '../constant';
import Notification from '@/components/ui/Notification.vue';
import Button from '@/components/ui/Button.vue';
import IconImages from '@/components/icons/IconImages.vue';
import IconEmojiSmile from '@/components/icons/IconEmojiSmile.vue';
import IconSendMessage from '@/components/icons/IconSendMessage.vue';
import type { Picture } from '../types/Picture';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css'
import PreviewPicture from './ui/PreviewPicture.vue';
import CharCounter from './ui/CharCounter.vue';


const emoji = ref<HTMLElement>();
const showEmojiPicker = ref(false);
const toggleShowEmojiPicker = () => showEmojiPicker.value = !showEmojiPicker.value;
onClickOutside(emoji, () => showEmojiPicker.value = false);

const userStore = useUserStore();
const postStore = usePostStore();

const textarea = ref<HTMLTextAreaElement>();
const dropZone = ref<HTMLDivElement>();
const { isOverDropZone } = useDropZone(dropZone, onDrop);

const inputText = ref<string>("");
const inputFiles = ref<Picture[]>([]);
const errorInputFile = ref<string>("");

const isModalOpen = ref(false);
const closeModal = () => isModalOpen.value = !isModalOpen.value;

useEventListener(window, "drop", (e) => e.preventDefault());
useEventListener(window, "dragover", (e) => e.preventDefault());

useResizeObserver(textarea, () => autogrow());

function autogrow() {
    if (textarea.value) {
        textarea.value.style.height = "auto";
        textarea.value.style.height = textarea.value.scrollHeight + 2 + "px";
    }
}

watch(inputFiles.value, () => {
    if (inputFiles.value) {
        for (const { id, file } of inputFiles.value) {
            if (!AVAILABLE_MIMETYPE.includes(file.type)) {
                deleteFile(id);
                errorInputFile.value = "Seuls les fichiers png, jpg et webp sont supportés";
                isModalOpen.value = true;
            }

            if (file.size > MAX_SIZE_PICTURE) {
                deleteFile(id);
                errorInputFile.value = `"${file.name}" fichier trop volumineux (10Mo maximum)`;
                isModalOpen.value = true;
            }
        }
    }
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

const formIsValid = computed((): boolean => {
    if (inputText.value.length > 0 || inputFiles.value.length > 0)
        return true;

    return false;
})

async function onSubmit(): Promise<void> {   
    const images: File[] = inputFiles.value.map((obj) => obj.file);

    try {
        if (formIsValid.value) {
            await postStore.createPost({
                message: inputText.value,
                images: images
            });
        }
    } 
    catch (error) {
        console.log(error);
    }
}

function onSelectEmoji(emoji: any) {
    inputText.value += emoji.i;
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

    <div ref="dropZone" :class="['create-post-container', { 'active-dropzone': isOverDropZone }]">
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
                    @input="autogrow" 
                    @focus="autogrow"
                ></textarea>

                <CharCounter :sentence="inputText" :limit="300" />

                <PreviewPicture :images="inputFiles" @delete-file="deleteFile($event)" />
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
                        :accept="AVAILABLE_MIMETYPE.join(', ')"
                    >
                </div>

                <div class="option opt-emoji" role="button" @click="toggleShowEmojiPicker">
                    <IconEmojiSmile />
                    <p>Emojis</p>
                </div>
                
                <Button type="primary" @click="onSubmit" :disabled="!formIsValid">
                    <IconSendMessage />
                </Button>
            </div>
        </div>
        
        <EmojiPicker 
            ref="emoji"
            v-show="showEmojiPicker" 
            class="emoji-picker" 
            :native="true" 
            :disable-skin-tones="true" 
            @select="onSelectEmoji" 
        />
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
    transition: background-color var(--transition-time);

    position: relative;

    &.active-dropzone {
        background-color: aliceblue;
    }

    .emoji-picker {
        position: absolute;
        top: calc(100% + 1rem);
        right: 50%;
        transform: translateX(50%);
    }

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
            gap: 1.5rem;

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