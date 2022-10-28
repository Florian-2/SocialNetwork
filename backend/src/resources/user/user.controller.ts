import { Router, Request, Response, NextFunction } from 'express';
import { isAuthenticated } from "@/middleware/authenticated.middleware";
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    // private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {       
        this.router.get(`${this.path}/profile`, isAuthenticated, this.profile);
    }

    private profile(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return next(new HttpException(404, "Vous n'êtes pas connecté"));
        }

        delete req.user.password;
        delete req.user.__v;

        res.status(200).send(req.user);
    };
}

export default UserController;