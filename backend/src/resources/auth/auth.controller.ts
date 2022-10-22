import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationFormData from '@/middleware/validation.middleware';


class AuthController implements Controller {
    public path = '/auth';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {       
        this.router.post(`${this.path}/register`, validationFormData(register), this.register.bind(this));
        this.router.post(`${this.path}/login`, validationFormData(login), this.login.bind(this));
        this.router.delete(`${this.path}/logout`, this.logout);
    }

    private async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.UserService.register(req.body);
            
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

    private logout(_req: Request, res: Response, _next: NextFunction) {
        res.clearCookie("accessToken");
        res.status(200).json(true);
    }
}

export default AuthController;