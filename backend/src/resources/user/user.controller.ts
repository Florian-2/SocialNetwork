import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationFormData from '@/middleware/validation.middleware';
import { register, login } from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import Auth from "@/middleware/authenticated.middleware";

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {       
        this.router.post(`${this.path}/register`, validationFormData(register), this.register.bind(this));
        this.router.post(`${this.path}/login`, validationFormData(login), this.login.bind(this));
        this.router.get(`${this.path}/profile`, Auth.authenticated, this.profile);
    }

    private async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { pseudo, email, password, language } = req.body;

            const result = await this.UserService.register(pseudo, email, password, language);
            
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: "lax"
            });

            res.status(201).json(result.user);
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const result = await this.UserService.login(email, password);

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: "lax"
            });

            res.status(201).json(result.user);
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private profile(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send(req.user);
    };
}

export default UserController;