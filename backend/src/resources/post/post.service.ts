import CommentModel from "@/resources/comment/comment.model";
import { CreateComment } from "@/resources/comment/comment.interface"
import { CreatePost, PostDocument, PostID } from "./post.interface";
import PostModel from "./post.model";
// import LikeModel from "@/resources/likes/like.model";


class PostService {
    public async createPost(body: CreatePost): Promise<PostDocument>  {
        try {            
            const post = await PostModel.create(body);
            return post;
        } 
        catch (error: any) {
            throw new Error("Une erreur est survenue lors de la création du post");
        }
    }

    public async createComment(postId: string, body: CreateComment)  {
        try {
            const postIsExist = await PostModel.exists({ _id: postId });

            if (!postIsExist) {               
                throw new Error("Le post sur lequel vous essayez d'ajouter un commentaire n'existe pas");
            }

            const comment = await CommentModel.create(body);
            return comment;
        } 
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    public async deletePost(postID: string, userID: string): Promise<PostID> {
        try {
            const post = await this.getOnePost(postID);

            if (!(String(post.author_id) === userID)) {
                throw new Error();
            }

            PostModel.deleteOne({ _id: postID });

            return post._id;
        } 
        catch (error: any) {           
            throw new Error("Une erreur est survenue lors de la tentative de suppression du post");
        }
    }

    public async getOnePost(postID: string): Promise<PostDocument> {
        try {
            const post = await PostModel.findOne({ _id: postID }, { __v: 0 });

            if (!post) {
                throw new Error("Post introuvable");
            }

            return post;
        } 
        catch (error) {
            throw error;
        }
    }

    // public async likePost(postID: string, userID: string) {
    //     try {
    //         const likeDoc = await LikeModel.findOne({ post_id: postID });
            
    //         if (likeDoc) {
    //             console.log("unlike");
    //             await LikeModel.deleteOne({ post_id: postID });
    //         }
    //         else {
    //             console.log("like");
    //             await LikeModel.create({
    //                 post_id: postID,
    //                 author_id: userID
    //             });
    //         }
    //     } 
    //     catch (error) {
    //         throw error;
    //     }
    // }
}

export default PostService;