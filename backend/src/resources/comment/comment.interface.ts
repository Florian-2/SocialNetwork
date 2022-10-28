import { PostDocument, PostID, Image} from "@/resources/post/post.interface";

export interface CommentDocument extends PostDocument { 
    post_id: PostID
};

export interface CreateComment {
    message: string;
    images?: Image[];
    author: string
}