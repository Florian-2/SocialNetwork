"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const valideEnv_1 = __importDefault(require("@/utils/valideEnv"));
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./resources/user/user.controller"));
(0, valideEnv_1.default)();
const app = new app_1.default([new user_controller_1.default], Number(process.env.PORT));
app.listen();
