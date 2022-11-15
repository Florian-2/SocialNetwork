export interface Post {
    _id: string;
    author_id: string;
    message: string;
    images: File[];
    likesCounter: number;
    iHaveLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
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