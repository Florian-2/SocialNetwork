import { PostDocument, PostID, Image} from "@/resources/post/post.interface";
import { Schema } from "mongoose";
import { UserID } from "@/resources/user/user.interface";

export interface CommentDocument extends Omit<PostDocument, "author_id"> { 
    author: { id: UserID, pseudo: string };
    post_id: PostID;
};

export interface CreateComment {
    message: string;
    images?: Image[];
    author: { id: UserID, pseudo: string };
}

export type CommentID = Schema.Types.ObjectId;