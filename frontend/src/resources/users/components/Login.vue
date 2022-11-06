<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import type { LoginUserForm } from '../interfaces/user.interface';
import { email, passwordWithRules } from '../validations/user.validators';
import { useUserStore } from '@/resources/users/store/user';
import { AxiosError } from 'axios'
import IconEye from '@/components/icons/IconEye.vue';
import IconEyeSlash from '@/components/icons/IconEyeSlash.vue';
import Button from '@/components/ui/Button.vue';


const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const errorServer = ref<string>();
const showPassword = ref(false);

const validationSchema = toFormValidator(z.object({
    email,
    password: passwordWithRules,
}));

const form = useForm<LoginUserForm>({
    validationSchema,
    initialValues: {
        email: "florian@mail.com",
        password: "Florian2022"
    }
});

const { 
    value: emailValue, 
    errorMessage: emailError, 
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    handleChange: passwordHandleChange, 
} = useField<string>("password", undefined, { validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {       
    try {
        await userStore.login(formData);
        router.push({ name: "Profile" });
    } 
    catch (e) {
        if (e instanceof AxiosError) { 
            errorServer.value = e.response?.data.message;
                
            const errors = e.response?.data?.errors;
            if (errors) {
                form.setErrors({ ...errors });
            }
        }
    }
});

const handleShowPassword = (): boolean => showPassword.value = !showPassword.value;
</script>

<template>

    <section class="form-container">
        <div class="form-content">
            <h1>{{ t("form.title.login") }}</h1>

            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="email">{{ t("form.label.email") }}</label>

                    <div class="input-content">
                        <input 
                            type="email" 
                            v-model="emailValue" 
                            @change="emailHandleChange"
                            id="email" name="email"
                        >
                    </div>

                    <span class="error-message" v-if="emailError">{{ t(emailError) }}</span>
                </div>

                <div class="form-group">
                    <label for="password">{{ t("form.label.password") }}</label>

                    <div class="input-content">
                        <input 
                            :type="showPassword ? 'text' : 'password'"
                            v-model="passwordValue" 
                            @change="passwordHandleChange"  
                            id="password" name="password"
                        >
                        <span class="icon" @click="handleShowPassword">
                            <IconEyeSlash v-if="showPassword"/>
                            <IconEye v-else/>
                        </span>
                    </div>

                    <span class="error-message" v-if="passwordError">{{ t(passwordError) }}</span>
                </div>

                <p v-if="errorServer" class="error-server">{{ errorServer }}</p>

                <Button 
                    type="primary"
                    @click="onSubmit" 
                    :disabled="form.isSubmitting.value" 
                    :is-loading="form.isSubmitting.value"
                >
                    Connexion
                </Button>
            </form>

            <p class="question-form">
                Vous n'avez pas de compte ? 
                <RouterLink to="Register">Inscription</RouterLink>
            </p>
        </div>

        <div class="title-content">
            <div class="logo">
                <h1>Hola</h1>
                <div id="point"></div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.error-server {
    margin-block: 2rem;
    text-align: center;
	font-size: clamp(1.2rem, 2vw, 1.4rem);
    color: var(--color-danger);
}
</style>