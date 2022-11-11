export interface User {
    _id: string;
    admin: boolean;
    pseudo: string;
    email: string;
    thumbnail: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterUserForm {
    pseudo: string;
    email: string;
    language: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserForm {
    email: string;
    password: string;
}