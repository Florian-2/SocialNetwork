import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';
import token from '@/utils/token';


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
                user = await UserModel.findOne({ email }, { password: 0, __v: 0 });
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

    public async getUserById(userID: string | ObjectId, option: { withPassword: boolean }): Promise<User> {
        try {
            let user: User | null = null; 

            if (option.withPassword) {
                user = await UserModel.findById(userID);
            } else {
                user = await UserModel.findById(userID, { password: 0, __v: 0 });
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

export default UserService;
