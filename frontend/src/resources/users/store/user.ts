import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

interface User {
	_id: string;
	pseudo: string;
	admin: boolean;
}

export const useUserStore = defineStore('user', () => {
	// State
	const user = ref<User | null>(null);
	const isAuthenticated = ref<boolean>(false);
	
	// Getters (computeds)


	// Watchers
	watch(user, () => user.value ? isAuthenticated.value = true : isAuthenticated.value = false);

	// Actions
	function login() {
		user.value = { _id: "1356Dgfhtx566", pseudo: "Florian02", admin: false };
	}

	return { 
		user, 
		isAuthenticated,
		login 
	};
});