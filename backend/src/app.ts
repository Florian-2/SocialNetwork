import express, { Application } from 'express';
import mongoose from "mongoose";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from 'path';
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from "@/middleware/error.middleware";

class App {
	public express: Application;
	public port: number;

	constructor(controllers: Controller[], port: number) {
		this.express = express();
		this.port = port;

		this.initialiseDatabaseConnection();
		this.initialiseMiddleware();
		this.i18n();
		this.initialiseControllers(controllers);
		this.initialiseErrorHandling();
	}

	private i18n(): void {
		const localesFolder = path.join(__dirname, "locales");

		i18next
			.use(i18nextMiddleware.LanguageDetector)
			.use(Backend)
			.init({
				initImmediate: false,
				fallbackLng: "fr",
				backend: {
					loadPath: path.join(localesFolder, "{{lng}}", "{{lng}}.json")
				}
			})
	}

	private initialiseMiddleware(): void {
		this.express.use(i18nextMiddleware.handle(i18next));
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(morgan('dev'));
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(compression());
	}

	private initialiseControllers(controllers: Controller[]): void {
		controllers.forEach((controller: Controller) => {
			this.express.use('/api', controller.router);
		});
	}

	private initialiseErrorHandling(): void {
		this.express.use(ErrorMiddleware);
	}

	private initialiseDatabaseConnection(): void {
		const { MONGO_PATH } = process.env;
		mongoose.connect(MONGO_PATH!);
	}

	public listen(): void {
		this.express.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
	}
}

export default App;