<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useUserStore } from '@/resources/users/store/user';
import Notification from '@/components/ui/Notification.vue';
import Button from '@/components/ui/Button.vue';
import IconImages from '@/components/icons/IconImages.vue';
import IconEmojiSmile from '@/components/icons/IconEmojiSmile.vue';
import IconSendMessage from '@/components/icons/IconSendMessage.vue';


const userStore = useUserStore();
const textarea = ref<HTMLTextAreaElement>();
const inputText = ref<string>("");
const inputFiles = ref<{ id: string, file: File, url: string }[]>([]);
const activeDropZone = ref(false);
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
    console.log(inputText.value);
});

const toggleActiveDropZone = (): boolean => activeDropZone.value = !activeDropZone.value;

function onChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (input.files) {        
        for (const file of input.files) {
            addFile(file);
        }

        input.files = null;
    }
}

function dropFiles(e: DragEvent): void {
    const files = e.dataTransfer?.files;
    
    if (files) {
        for (const file of files) {
            addFile(file);
        }
    }

    toggleActiveDropZone();
}

function addFile(file: File): void {
    if (inputFiles.value.length >= 2) {
        errorInputFile.value = "Vous êtes limité à 2 images par post";
        isModalOpen.value = true;
        return;
    }

    inputFiles.value.push({ file, url: URL.createObjectURL(file), id: crypto.randomUUID() });
}

function deleteFile(id: string): void {
    const index = inputFiles.value.findIndex((file) => file.id === id);
    inputFiles.value.splice(index, 1);
}

const closeModal = () => isModalOpen.value = !isModalOpen.value;

function onSubmit() {
    console.log("send");
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

        <div class="create-post">
            <div class="post-input">
                <textarea 
                    ref="textarea"
                    v-model="inputText"
                    name="post" id="post"
                    placeholder="Quoi de neuf ?"
                    :class="{ 'active-dropzone': activeDropZone }"
                    @input="autogrow" 
                    @focus="autogrow"
                    @dragenter.prevent="toggleActiveDropZone"
                    @dragleave.prevent="toggleActiveDropZone"
                    @dragover.prevent
                    @drop.prevent="dropFiles"
                ></textarea>

                <div v-for="{ id, file, url } of inputFiles" :key="id">
                    <img :src="url" :alt="file.name" draggable="false">
                    <button @click="deleteFile(id)">X</button>
                </div>

                <Button type="primary" @click="onSubmit">
                    <IconSendMessage/>
                </Button>
            </div>

            <div class="options-container">
                <div class="option opt-images" role="button">
                    <label for="files">
                        <IconImages/>
                        Images
                    </label>
                    
                    <input @change="onChange" type="file" name="files" id="files" multiple :accept="availableMimeType.join(', ')">
                </div>

                <div class="option opt-emoji" role="button">
                    <IconEmojiSmile/>
                    <p>Emojis</p>
                </div>
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
        width: 50px;
        height: 50px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .create-post {
        flex-grow: 1;

        .post-input {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        textarea {
            flex-basis: 100%;
            padding: 0.5rem;
            border-radius: var(--raduis);
            outline: none;
            font-size: clamp(1.2rem, 2vw, 1.4rem);
            border-radius:  calc(var(--raduis) * 2);
            border: 1px solid var(--t-color-border);
            resize: none;
            overflow: hidden;

            &:focus {
                border-color: var(--t-color-border-focus);
            }

            &.active-dropzone {
                border-color: var(--t-color-border-focus);
                background-color: var(--color-hover);
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

                input { display: none; }
            }
        }
    }
}

img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>