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
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
class UserController {
    path = '/users';
    router = (0, express_1.Router)();
    UserService = new user_service_1.default();
    constructor() {
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.register), this.register.bind(this));
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.login), this.login.bind(this));
        this.router.get(`${this.path}/profile`, authenticated_middleware_1.default.authenticated, this.profile);
    }
    async register(req, res, next) {
        try {
            const { pseudo, email, password, language } = req.body;
            const result = await this.UserService.register(pseudo, email, password, language);
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: "lax"
            });
            res.status(201).json(result.user);
        }
        catch (error) {
            next(new http_exception_1.default(400, error.message));
        }
    }
    ;
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this.UserService.login(email, password);
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: "lax"
            });
            res.status(201).json(result.user);
        }
        catch (error) {
            next(new http_exception_1.default(400, error.message));
        }
    }
    ;
    profile(req, res, next) {
        if (!req.user) {
            return next(new http_exception_1.default(404, 'No logged in user'));
        }
        res.status(200).send(req.user);
    }
    ;
}
exports.default = UserController;
