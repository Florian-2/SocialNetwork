import { PostDocument, PostID, Image} from "@/resources/post/post.interface";
import { Schema } from 'mongoose';

export interface CommentDocument extends PostDocument { 
    post_id: PostID
};

export interface CreateComment {
    message: string;
    images?: Image[];
    author_id: Schema.Types.ObjectId | string;
    post_id: Schema.Types.ObjectId | string;
}