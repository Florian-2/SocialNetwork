import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "@/middleware/authenticated.middleware";
import { uploadFile } from "@/middleware/uploadFile.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { UserID } from "@/resources/user/user.interface";
import { Image } from "./post.interface";
import PostServices from "./post.service";


class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    public PostServices = new PostServices();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {       
        this.router.post(`${this.path}/create`, isAuthenticated, uploadFile ,this.createPost.bind(this));
        this.router.delete(`${this.path}/delete/:id`, isAuthenticated, this.deletePost.bind(this));
    }

    private async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const files: Image[] = [];
            
            if (Array.isArray(req.files)) {
                req.files.forEach((file) => {
                    files.push({
                        filename: file.filename,
                        path: file.path,
                        size: file.size
                    });
                })
            }

            const post = await this.PostServices.createPost({
                message: req.body.message as string,
                author: req.user._id as UserID,
                images: files
            });

            res.status(201).json(post);
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postID = await this.PostServices.deletePost(req.params.id, req.user.id);

            res.status(200).json({ id: postID });
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PostController;