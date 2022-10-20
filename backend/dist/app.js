"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
class App {
    express;
    port;
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.i18n();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    i18n() {
        const localesFolder = path_1.default.join(__dirname, "locales");
        console.log(localesFolder);
        i18next_1.default
            .use(i18next_http_middleware_1.default.LanguageDetector)
            .use(i18next_fs_backend_1.default)
            .init({
            initImmediate: false,
            fallbackLng: "fr",
            backend: {
                loadPath: path_1.default.join(localesFolder, "{{lng}}", "{{lng}}.json")
            }
        });
    }
    initialiseMiddleware() {
        this.express.use(i18next_http_middleware_1.default.handle(i18next_1.default));
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseDatabaseConnection() {
        const { MONGO_PATH } = process.env;
        mongoose_1.default.connect(MONGO_PATH);
    }
    listen() {
        this.express.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
    }
}
exports.default = App;
