"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = require("@/resources/user/user.validation");
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const features_1 = require("@/utils/features");
// import authenticated from '@/middleware/authenticated.middleware';
class UserController {
    path = '/users';
    router = (0, express_1.Router)();
    UserService = new user_service_1.default();
    constructor() {
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.register), this.register);
        // this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login);
        // this.router.get(`${this.path}/profile`, authenticated, this.profile);
    }
    register = async (req, res, next) => {
        try {
            console.log(req.t("form.test"));
            const { pseudo, email, password } = req.body;
            const language = (0, features_1.getAcceptLanguage)(req.headers);
            const result = await this.UserService.register(pseudo, email, password, language);
            if (result) {
                res.cookie("accessToken", result.accessToken, {
                    httpOnly: true,
                    sameSite: "lax"
                });
                res.status(201).json(result.user);
            }
        }
        catch (error) {
            next(new http_exception_1.default(400, error.message));
        }
    };
}
exports.default = UserController;
