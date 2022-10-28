import bcrypt from "bcrypt";
import UserModel from './user.model';
import User from './user.interface';
import token from '@/utils/token';
import { ObjectId } from "mongoose";


class UserService {
    public async register(body: User): Promise<{ user: User, accessToken: string }> {
        try {
            const userWithPassword = await UserModel.create(body);
            const user = await this.getUserById(userWithPassword.id, { withPassword: false });

            const accessToken = token.createToken(user);
            return { user, accessToken };
        }
        catch (error: any) {
            throw error;
        }
    }

    public async login(email: string, password: string): Promise<{ user: User, accessToken: string }> {
        try {
            let user = await this.getUserByEmail(email, { withPassword: true });
            
            if (await bcrypt.compare(password, user.password!)) {
                const accessToken = token.createToken(user);

                user = user.toObject();
                delete user.password;
                delete user.__v;
             
                return { user, accessToken };
            }

            throw new Error();
        } 
        catch (error: any) {
            throw new Error("Adresse mail ou mot de passe incorrect"); // i18n => form.login
        }
    }

    public async getUserByEmail(email: string, option?: { withPassword: boolean }): Promise<User> {
        try {
            let user: User | null = null;

            if (option?.withPassword) {
                user = await UserModel.findOne({ email });
            } else {
                user = await UserModel.findOne({ email }).select("-password -__v");
            }

            if (!user) {
                throw new Error("Utilisateur introuvable");
            }

            return user;
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getUserById(userID: string | ObjectId, option?: { withPassword: boolean }): Promise<User> {
        try {
            let user: User | null = null; 

            if (option?.withPassword) {
                user = await UserModel.findById(userID);
            } else {
                user = await UserModel.findById(userID).select("-password -__v");
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

    public async userExist(verif: "id" | "email" | "pseudo", data: string): Promise<boolean> {
        try {
            let user = null;           

            switch (verif) {
                case "id":
                    user = await UserModel.exists({ _id: data });
                    break;

                case "email":
                    user = await UserModel.exists({ email: data });
                    break;

                case "pseudo":
                    user = await UserModel.exists({ pseudo: data });
                    break;
            
                default:
                    break;
            }
            
            return user ? true : false;
        }
        catch (error) {
            return false;
        }
    }
}

export default UserService;
