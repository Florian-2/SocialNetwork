import { Document } from 'mongoose';
import { UserID } from "@/resources/user/user.interface";
import { PostID } from "@/resources/post/post.interface";


export interface LikeDocument extends Document {
    post_id: UserID,
    author_id: PostID
}