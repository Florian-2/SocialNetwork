import { Document, Schema } from 'mongoose';
import { CommentID } from "@/resources/comment/comment.interface"


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
    comments: CommentID[]
}

export interface CreatePost {
    message: string;
    images?: Image[];
    author_id: Schema.Types.ObjectId;
}