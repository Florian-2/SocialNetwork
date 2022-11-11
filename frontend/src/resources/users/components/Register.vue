<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import type { RegisterUserForm } from '../interfaces/user.interface';
import { pseudo, email, passwordWithRules, confirmPassword } from '../validations/user.validators';
import { useUserStore } from '@/resources/users/store/user';
import { AxiosError } from 'axios'
import IconEye from '@/components/icons/IconEye.vue';
import IconEyeSlash from '@/components/icons/IconEyeSlash.vue';
import Button from '@/components/ui/Button.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const showPassword = ref(false);

const validationSchema = toFormValidator(z.object({
    pseudo,
    email,
    password: passwordWithRules,
    confirmPassword
})
.refine((data) => data.password === data.confirmPassword, { 
    path: ["confirmPassword"], 
    message: "form.error.confirmPassword" 
}));

const form = useForm<RegisterUserForm>({
    validationSchema,
    // initialValues: {
    //     pseudo: "_Flo_",
    //     email: "florian@mail.com",
    //     language: "fr",
    //     password: "Florian2022",
    //     confirmPassword: "Florian2022"
    // }
});

const { 
    value: pseudoValue, 
    errorMessage: pseudoError, 
    handleChange: pseudoHandleChange, 
} = useField<string>("pseudo", undefined, { validateOnValueUpdate: false });
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
const { 
    value: confirmPasswordValue, 
    errorMessage: confirmPasswordError, 
    handleChange: confirmPasswordHandleChange, 
} = useField<string>("confirmPassword", undefined, { validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {       
    try {      
        await userStore.register(formData);
        router.push({ name: "Posts" });
    } 
    catch (e) {
        if (e instanceof AxiosError) {           
            const errors = e.response?.data?.errors;
            form.setErrors({ ...errors });
        }
    }
});

const handleShowPassword = (): boolean => showPassword.value = !showPassword.value;
</script>

<template>
    <section class="form-container">
        <div class="form-content">
            <h1>{{ t("form.title.register") }}</h1>

            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="pseudo">{{ t("form.label.pseudo") }}</label>

                    <div :class="['input-content', { 'error': pseudoError } ]">
                        <input 
                            type="text"
                            v-model="pseudoValue" 
                            @change="pseudoHandleChange"
                            id="pseudo" name="pseudo"  
                        >
                    </div>
                    
                    <span class="error-message" v-if="pseudoError">{{ t(pseudoError) }}</span>
                </div>

                <div class="form-group">
                    <label for="email">{{ t("form.label.email") }}</label>

                    <div :class="['input-content', { 'error': emailError }]">
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

                    <div :class="['input-content', { 'error': passwordError }]">
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

                <div class="form-group">
                    <label for="confirmPassword">{{ t("form.label.confirmPassword") }}</label>

                    <div :class="['input-content', { 'error': confirmPasswordError }]">
                        <input 
                            :type="showPassword ? 'text' : 'password'"
                            v-model="confirmPasswordValue" 
                            @change="confirmPasswordHandleChange"
                            id="confirmPassword" name="confirmPassword"
                        >
                        <span class="icon" @click="handleShowPassword">
                            <IconEyeSlash v-if="showPassword"/>
                            <IconEye v-else/>
                        </span>
                    </div>

                    <span class="error-message" v-if="confirmPasswordError">{{ t(confirmPasswordError) }}</span>
                </div>

                <Button @click="onSubmit" type="primary" :disabled="form.isSubmitting.value">Valider</Button>
            </form>
            
            <p class="question-form">
                Vous avez un compte ? 
                <RouterLink to="Login">Connexion</RouterLink>
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