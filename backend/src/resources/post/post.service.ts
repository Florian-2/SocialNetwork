import PostModel from "./post.model";
import CommentModel from "@/resources/comment/comment.model";
import { CreateComment } from "@/resources/comment/comment.interface"
import { CreatePost, PostDocument, PostID } from "./post.interface";
import fs from "fs/promises";
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
            const postExist = await PostModel.exists({ _id: postId });

            if (!postExist) {               
                throw new Error("Le post sur lequel vous essayez d'ajouter un commentaire n'existe pas");
            }

            const comment = await CommentModel.create(body);
            await PostModel.updateOne({ _id: postId }, { $push: { comments: comment._id } });

            return comment;
        } 
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    public async getAllPosts(page: number, limit: number) {
        try {
            const posts = await PostModel.find({}, { __v: 0 })
                                                    .populate("author_id", { password: 0, __v: 0 })
                                                    .populate("comments", { __v: 0 })
                                                    .skip((page - 1) * limit)
                                                    .limit(limit * 1)
                                
            const countPosts = await PostModel.countDocuments();           

            if (!posts) {
                throw new Error("Aucun posts");
            }

            return { posts, countPosts };
        } 
        catch (error) {
            throw error;
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
    
    public async updateTextPost(postID: string, userID: string, editedMessage: string) {
        try {
            const post = await this.getOnePost(postID);

            if (!(String(post.author_id) === userID)) {
                throw new Error();
            }
            
            post.message = editedMessage;
            await post.save();

            return post;
        } 
        catch (error: any) {
            throw new Error("Une erreur est survenue lors de la tentative de modification du post");
        }
    }

    // public async updateFilesPost(postID: string, userID: string, images: Image[] | undefined) {
    //     try {
    //         const post = await this.getOnePost(postID);

    //         if (!(String(post.author_id) === userID)) {
    //             throw new Error();
    //         }
            
    //         post.images = ;
    //         await post.save();

    //         return post;
    //     } 
    //     catch (error: any) {
    //         throw new Error("Une erreur est survenue lors de la tentative de modification du post");
    //     }
    // }

    public async deletePost(postID: string, userID: string): Promise<PostID> {
        try {
            const [post] = await Promise.all([this.getOnePost(postID), PostModel.deleteOne({ _id: postID })]);
            
            if (!(String(post.author_id) === userID)) {
                throw new Error();
            }

            if (post.images && post.images.length > 0) {
                for (const file of post.images) {
                    await fs.unlink(`${file.absolutePath}`).catch((err) => console.log(err));
                }
            }

            return post._id;
        } 
        catch (error: any) {
            throw new Error("Une erreur est survenue lors de la tentative de suppression du post");
        }
    }

    // public async likePost(postID: string, userID: string) {
    //     try {
    //         const post = await PostModel.findByIdAndUpdate(postID);

    //         if (!post) {
    //             throw new Error("Post introuvable");
    //         }
            

    //     } 
    //     catch (error) {
    //         throw error;
    //     }
    // }
}

export default PostService;