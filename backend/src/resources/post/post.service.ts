import { CreatePost, PostDocument, PostID } from "./post.interface";
import PostModel from "./post.model";


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

    public async deletePost(postID: string, userID: string): Promise<PostID> {
        try {
            const post = await this.getOnePost(postID);

            if (!(String(post.author) === userID)) {
                throw new Error();
            }

            PostModel.deleteOne({ _id: postID });

            return post._id;
        } 
        catch (error: any) {           
            throw new Error("Une erreur est survenue lors de la tentative de suppression du post");
        }
    }

    private async getOnePost(postID: string): Promise<PostDocument> {
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
}

export default PostService;