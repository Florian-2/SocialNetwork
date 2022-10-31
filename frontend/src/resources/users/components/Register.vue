<script setup lang="ts">
// import { ref } from "vue";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";
import type { RegisterUserForm } from '../interfaces/user.interface';
import { pseudo, email, passwordWithRules, confirmPassword } from "../validations/user.validators";
import { useUserStore } from "@/resources/users/store/user";
import { AxiosError } from 'axios'


const { t } = useI18n();
const userStore = useUserStore();

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

const form = useForm<RegisterUserForm>({validationSchema});

const { 
    value: pseudoValue, 
    errorMessage: pseudoError, 
    // meta: pseudoMeta, 
    handleChange: pseudoHandleChange, 
} = useField<string>("pseudo", undefined, { initialValue: "_Flo_", validateOnValueUpdate: false });
const { 
    value: emailValue, 
    errorMessage: emailError, 
    // meta: emailMeta,
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { initialValue: "florian@mail.com", validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    // meta: passwordMeta,
    handleChange: passwordHandleChange, 
} = useField<string>("password", undefined, { initialValue: "Florian2022", validateOnValueUpdate: false });
const { 
    value: confirmPasswordValue, 
    errorMessage: confirmPasswordError, 
    // meta: confirmPasswordwdMeta,
    handleChange: confirmPasswordHandleChange, 
} = useField<string>("confirmPassword", undefined, { initialValue: "Florian2022", validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {       
    try {      
        await userStore.register(formData);
    } 
    catch (e) {
        if (e instanceof AxiosError) {           
            const errors = e.response?.data?.errors;
            
            console.log(form.errors.value);
            form.setErrors({ ...errors });
            console.log(form.errors.value);

            // for (const err of errors) {
            //     const field = err.field as string;
            //     const message = err.field;
            //     form.setErrors({ field: message });
            // }
        }
    }
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="pseudo">{{ t("form.label.pseudo") }}</label>
            <input 
                type="text"
                v-model="pseudoValue" 
                @change="pseudoHandleChange"
                @blur="pseudoHandleChange"
                id="pseudo" name="pseudo"
            >
            <small v-if="pseudoError">{{ t(pseudoError) }}</small>
        </div>

        <div class="form-group">
            <label for="email">{{ t("form.label.email") }}</label>
            <input 
                type="email" 
                v-model="emailValue" 
                @change="emailHandleChange"
                @blur="emailHandleChange"         
                id="email" name="email"
            >
            <small v-if="emailError">{{ t(emailError) }}ERR</small>
        </div>

        <div class="form-group">
            <label for="password">{{ t("form.label.password") }}</label>
            <input 
                type="text"
                v-model="passwordValue" 
                @change="passwordHandleChange" 
                @blur="passwordHandleChange"      
                id="password" name="password"
            >
            <small v-if="passwordError">{{ t(passwordError) }}ERR</small>
        </div>

        <div class="form-group">
            <label for="confirmPassword">{{ t("form.label.confirmPassword") }}</label>
            <input 
                type="text" 
                v-model="confirmPasswordValue" 
                @change="confirmPasswordHandleChange" 
                @blur="confirmPasswordHandleChange" 
                id="confirmPassword" name="confirmPassword"
            >
            <small v-if="confirmPasswordError">{{ t(confirmPasswordError) }}</small>
        </div>

        <pre>{{ form.errors }}</pre>

        <button @click="onSubmit" :disabled="form.isSubmitting.value">Valider</button>
    </form>
</template>

<style scoped>

</style>