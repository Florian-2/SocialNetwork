import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';
import token from '@/utils/token';


class UserService {
    public async register(pseudo: string, email: string, password: string, language: string): Promise<{ user: User, accessToken: string }> {
        try {
            const userWithPassword = await UserModel.create({ pseudo, email, password, language });
            const user = await this.getUserById(userWithPassword.id, { withPassword: false });

            const accessToken = token.createToken(user);
            return { user, accessToken };
        }
        catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    public async getUserByEmail(email: string, option: { withPassword: boolean }): Promise<User> {
        try {
            let user: User | null = null;

            if (option.withPassword) {
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

    public async getUserById(userID: string, option: { withPassword: boolean }): Promise<User> {
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
