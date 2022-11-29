import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "@/middleware/authenticated.middleware";
import { createPost } from "@/resources/post/post.validation"
import { uploadFile } from "@/middleware/uploadFile.middleware";
import validationFormData from '@/middleware/validation.middleware';
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { UserID } from "@/resources/user/user.interface";
import { Image } from "./post.interface";
import PostServices from "./post.service";
import { createComment } from "@/resources/comment/comment.validation";


class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    public PostServices = new PostServices();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/create`, isAuthenticated, uploadFile, validationFormData(createPost), this.createPost.bind(this));
        this.router.post(`${this.path}/:id/create/comment`, isAuthenticated, uploadFile, validationFormData(createComment), this.createComment.bind(this));
        this.router.patch(`${this.path}/update/text/:id`, isAuthenticated, validationFormData(createPost), this.updateTextPost.bind(this));
        // this.router.patch(`${this.path}/update/files/:id`, isAuthenticated, this.updateFilesPost.bind(this));

        this.router.get(`${this.path}`, isAuthenticated, this.getManyPosts.bind(this));
        this.router.get(`${this.path}/:id/comments`, isAuthenticated, this.getManyComments.bind(this));
        this.router.delete(`${this.path}/delete/:id`, isAuthenticated, this.deletePost.bind(this));
        this.router.delete(`${this.path}/delete/comment/:id`, isAuthenticated, this.deleteComment.bind(this));
        // this.router.post(`${this.path}/like/:id`, isAuthenticated, this.likePost.bind(this));
    }

    private formatImgFile(req: Request): Image[] | undefined {
        const files: Image[] = [];

        if (!Array.isArray(req.files)) {
            return;
        }

        req.files.forEach((file) => {
            files.push({
                filename: file.filename,
                path: `/${file.mimetype.split("/")[0]}s/${file.filename}`, // Ex: /images/photo.jpg
                absolutePath: file.path,
                size: file.size
            });
        })

        return files;
    }

    private async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const files = this.formatImgFile(req);

            const post = await this.PostServices.createPost({
                message: req.body.message,
                author: req.user._id,
                images: files
            });

            res.status(201).json(post);
        }
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const files = this.formatImgFile(req);
            const postId = req.params.id;

            const comment = await this.PostServices.createComment(postId, {
                message: req.body.message,
                author: { id: req.user._id as UserID, pseudo: req.user.pseudo },
                images: files
            });

            res.status(201).json(comment);
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async getManyPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5; // 15

            const { posts, countPosts } = await this.PostServices.getManyPosts(page, limit);

            res.status(200).json({
                posts,
                totalPages: Math.ceil(countPosts / limit),
                currentPage: page
            });
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async getManyComments(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id;
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            
            const { comments, countComments } = await this.PostServices.getManyComments(postId, page, limit);

            res.status(200).json({
                comments,
                totalPages: Math.ceil(countComments / limit),
                currentPage: page
            });
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async updateTextPost(req: Request, res: Response, next: NextFunction) {
        try {            
            const post = await this.PostServices.updateTextPost(req.params.id, req.user.id, req.body.message);

            res.status(200).json(post);
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    // private async updateFilesPost(req: Request, res: Response, next: NextFunction) {
    //     try {            
    //         const files = this.formatImgFile(req);
    //         const post = await this.PostServices.updateFilesPost(req.params.id, req.user.id, files);

    //         res.status(200).json(post);
    //     } 
    //     catch (error: any) {
    //         next(new HttpException(400, error.message));
    //     }
    // }

    private async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = await this.PostServices.deletePost(req.params.id, req.user.id);

            res.status(200).json({ id: postId });
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId = await this.PostServices.deleteComment(req.params.id, req.user.id);

            res.status(200).json({ id: commentId });
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    // private async likePost(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const postId = req.params.id;

    //         if (postId) {
    //             await this.PostServices.likePost(postId, req.user.id);
    //         }
            
    //         res.end();
    //     } 
    //     catch (error: any) {
    //         next(new HttpException(400, error.message));
    //     }
    // }
}

export default PostController;