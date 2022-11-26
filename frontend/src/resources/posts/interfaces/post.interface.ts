import type { User } from "@/resources/users/interfaces/user.interface";

export interface Post {
    _id: string;
    author: User;
    message: string;
    images: ImagePost[];
    likesCounter: number;
    iHaveLiked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ImagePost {
    filename: string;
    path: string;
    absolutePath: string;
    size: number;
}

export interface CreatePost {
    message: string;
    images: File[];
}