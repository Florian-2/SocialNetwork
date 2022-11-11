<script setup lang="ts">
import { ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import Button from '@/components/ui/Button.vue';
import IconImages from '@/components/icons/IconImages.vue';
import IconEmojiSmile from '@/components/icons/IconEmojiSmile.vue';
import IconSendMessage from '@/components/icons/IconSendMessage.vue';
import { useUserStore } from '@/resources/users/store/user';


const userStore = useUserStore();
const textarea = ref<HTMLTextAreaElement>();

useResizeObserver(textarea, () => autogrow());

function autogrow() {  
    if (textarea.value) {
        textarea.value.style.height = "auto";
        textarea.value.style.height = textarea.value.scrollHeight + 2 + "px";
    }
}

function onSubmit() {
    console.log("send");
}
</script>

<template>
    <div class="create-post-container">
        <div class="thumbnail">
            <img :src="userStore.currentUser?.thumbnail" alt="avatar">
        </div>

        <div class="create-post">
            <div class="post-input">
                <textarea 
                    ref="textarea"
                    name="post" id="post"
                    placeholder="Quoi de neuf ?"
                    @input="autogrow" 
                    @focus="autogrow"
                ></textarea>

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
                    
                    <input type="file" name="files" id="files">
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
</style>