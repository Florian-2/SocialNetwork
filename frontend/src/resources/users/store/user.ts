import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { detectedLanguage } from '@/i18n'
import AuthServices from '../services/auth.services';

import type { LoginUserForm, RegisterUserForm, User } from '../interfaces/user.interface';


export const useUserStore = defineStore('user', () => {
	// State
	const currentUser = ref<User | null>(null);
	const loaded = ref(false);
	const isAuthenticated = ref(false);
	
	// Getters (computeds)
	

	// Watchers
	watch(currentUser, () => {
		if (currentUser.value) {
			isAuthenticated.value = true;
		}
		else if (!currentUser.value && loaded.value) {
			isAuthenticated.value = false;
		} 
		else {
			isAuthenticated.value = false;
		}
	});

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

	async function fetchCurrentUser() {
		try {
			currentUser.value = await AuthServices.fetchCurrentUser();
			loaded.value = true;
		} 
		catch (error) {
			loaded.value = true;
		}
	}

	return { 
		currentUser, 
		loaded,
		isAuthenticated,
		register,
		login,
		fetchCurrentUser
	};
});