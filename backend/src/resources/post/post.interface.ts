import { Document, Schema } from 'mongoose';


export type PostID = Schema.Types.ObjectId;

export interface Image {
    filename: string,
    path: string,
    absolutePath: string,
    size: number
}

export interface PostDocument extends Document {
    message: string;
    images?: Image[]; 
    author_id: Schema.Types.ObjectId;
}

export interface CreatePost {
    message: string;
    images?: Image[];
    author_id: Schema.Types.ObjectId;
}