import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { detectedLanguage } from '@/i18n'
import AuthServices from '../services/auth.services';

import type { LoginUserForm, RegisterUserForm, User } from '../interfaces/user.interface';


export const useUserStore = defineStore('user', () => {
	// State
	const currentUser = ref<User | null>(null);
	const isAuthenticated = ref<boolean>(false);
	
	// Getters (computeds)
	

	// Watchers
	watch(currentUser, () => currentUser.value ? isAuthenticated.value = true : isAuthenticated.value = false);

	// Actions
	async function register(formaData: RegisterUserForm) {
		try {
			const user = await AuthServices.register({ ...formaData, language: detectedLanguage });
			currentUser.value = user;
		} 
		catch (error) {
			throw error;
		}
	}

	async function login(formaData: LoginUserForm) {
		try {
			const user = await AuthServices.login(formaData);
			currentUser.value = user;
		} 
		catch (error) {
			throw error;
		}
	}

	return { 
		currentUser, 
		isAuthenticated,
		register,
		login 
	};
});