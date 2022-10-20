"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const token_1 = __importDefault(require("@/utils/token"));
class UserService {
    async register(pseudo, email, password, language) {
        try {
            const userWithPassword = await user_model_1.default.create({ pseudo, email, password, language });
            const user = await this.getUserById(userWithPassword.id, { withPassword: false });
            const accessToken = token_1.default.createToken(user);
            return { user, accessToken };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getUserByEmail(email, option) {
        try {
            let user = null;
            if (option.withPassword) {
                user = await user_model_1.default.findOne({ email });
            }
            else {
                user = await user_model_1.default.findOne({ email }, { password: 0, __v: 0 });
            }
            if (!user) {
                throw new Error("Utilisateur introuvable");
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserById(userID, option) {
        try {
            let user = null;
            if (option.withPassword) {
                user = await user_model_1.default.findById(userID);
            }
            else {
                user = await user_model_1.default.findById(userID, { password: 0, __v: 0 });
            }
            if (!user) {
                throw new Error("Utilisateur introuvable");
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserService;
