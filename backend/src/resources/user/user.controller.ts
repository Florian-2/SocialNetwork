import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationFormData from '@/middleware/validation.middleware';
import { register } from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import { getAcceptLanguage } from '@/utils/features';
// import authenticated from '@/middleware/authenticated.middleware';


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/register`, validationFormData(register), this.register);
        // this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login);
        // this.router.get(`${this.path}/profile`, authenticated, this.profile);
    }

    private register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.t("form.test"));

            const { pseudo, email, password } = req.body;
            const language = getAcceptLanguage(req.headers);

            const result = await this.UserService.register(pseudo, email, password, language);
            
            if (result) {
                res.cookie("accessToken", result.accessToken, {
                    httpOnly: true,
                    sameSite: "lax"
                });

                res.status(201).json(result.user);
            }
        } 
        catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;