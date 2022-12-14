import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/valideEnv';
import App from './app';
import UserController from './resources/user/user.controller';
import AuthController from './resources/auth/auth.controller';
import PostController from './resources/post/post.controller';


validateEnv();

const app = new App([new AuthController ,new UserController, new PostController], Number(process.env.PORT));

app.listen();