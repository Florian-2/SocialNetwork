import PostModel from "./post.model";
import { CreatePost, PostDocument, PostID } from "./post.interface";
import CommentModel from "@/resources/comment/comment.model";
import { CommentDocument, CommentID, CreateComment } from "@/resources/comment/comment.interface"
import { deleteManyFiles } from "@/utils/features/files";
// import LikeModel from "@/resources/likes/like.model";


class PostService {
    public async createPost(body: CreatePost): Promise<PostDocument>  {
        try {            
            const post = await PostModel.create(body);
            return post;
        } 
        catch (error: any) { 
            console.log(error);
            
            throw new Error("Une erreur est survenue lors de la création du post");
        }
    }

    public async createComment(postId: string, body: CreateComment)  {
        try {
            const postExist = await PostModel.exists({ _id: postId });

            if (!postExist) {               
                throw new Error("Le post sur lequel vous essayez d'ajouter un commentaire n'existe pas");
            }

            const comment = await CommentModel.create({ ...body, post_id: postId });

            return comment;
        } 
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    public async getManyPosts(page: number, limit: number) {
        try {
            const posts = await PostModel.find({}, { __v: 0 })
                                                    .populate("author_id", { password: 0, __v: 0 })
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

    public async getOneComment(commentID: string): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.findOne({ _id: commentID }, { __v: 0 });

            if (!comment) {
                throw new Error("Commentaire introuvable");
            }

            return comment;
        } 
        catch (error) {
            throw error;
        }
    }

    public async getManyComments(postID: string, page: number, limit: number) {
        try {
            const [comments, countComments] = await Promise.all([
                CommentModel.find({ post_id: postID }, { __v: 0 }).skip((page - 1) * limit).limit(limit * 1), 
                CommentModel.countDocuments()
            ]); 

            if (!comments) {
                throw new Error("Aucun commentaire");
            }
            
            return { comments, countComments };
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
            const post = await this.getOnePost(postID);
            
            if (!(String(post.author_id) === userID)) {
                throw new Error();
            }
            
            // Suppresion des fichiers (pièce jointe) si besoin ET suppression du post et de ses commentaires
            await Promise.all([
                post.images && deleteManyFiles(post.images), 
                PostModel.deleteOne({ _id: postID }),
                CommentModel.deleteMany({ post_id: postID })
            ]);

            return post._id;
        } 
        catch (error: any) {
            throw new Error("Une erreur est survenue lors de la tentative de suppression du post");
        }
    }

    public async deleteComment(commentID: string, userID: string): Promise<CommentID> {
        try {
            const comment = await this.getOneComment(commentID);
            
            if (!(String(comment.author.id) === userID)) { 
                throw new Error();
            }

            await Promise.all([
                comment.images && deleteManyFiles(comment.images), 
                CommentModel.deleteOne({ _id: commentID })
            ]);

            return comment._id;
        } 
        catch (error: any) {
            throw new Error("Une erreur est survenue lors de la tentative de suppression du commentaire");
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