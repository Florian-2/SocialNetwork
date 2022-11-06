import axios from "axios";
import type { RegisterUserForm, LoginUserForm, User } from "../interfaces/user.interface";


export async function register(formData: RegisterUserForm): Promise<User> {
    try {
        const user = await axios.post("/api/auth/register", formData);
        return user.data;
    }
    catch (error) {
        throw error;
    }
}

export async function login(formData: LoginUserForm): Promise<User> {
    try {
        const user = await axios.post("/api/auth/login", formData);
        return user.data;
    } 
    catch (error) {
        throw error;
    }
}

export async function logout(): Promise<void> {
    try {
        await axios.delete("/api/auth/logout");
    } 
    catch (error) {
        throw error;
    }
}

export async function fetchCurrentUser(): Promise<User> {
    try {
        const user = await axios.get("/api/user/profile");
        return user.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
}

export default { register, login, logout, fetchCurrentUser };