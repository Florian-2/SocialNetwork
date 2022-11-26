import { Document, Schema } from 'mongoose';
import User from '../user/user.interface';


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
    author: User;
}

export interface CreatePost {
    message: string;
    images?: Image[];
    author: Schema.Types.ObjectId;
}