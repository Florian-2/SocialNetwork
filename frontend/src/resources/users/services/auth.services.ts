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

export default { register, login };