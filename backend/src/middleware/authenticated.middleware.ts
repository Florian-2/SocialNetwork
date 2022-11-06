import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '@/utils/token';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/resources/user/user.service';


export async function isAuthenticated(req: Request, _res: Response, next: NextFunction) {
    const token: string | undefined = req.cookies?.accessToken;

    if (!token) {
        return next(new HttpException(401, "Veuillez vous connecter pour accéder à cette ressource"));
    }

    try {
        const decode = await verifyToken(token);

        const userService = new UserService();
        const user = await userService.getUserById(decode.id);

        req.user = user;

        return next();
    } 
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new HttpException(401, "Votre session a expiré, veuillez vous reconnecter"));
        }

        next(new HttpException(401, "Une erreur est survenue veuillez vous reconnecter"));
    }
}