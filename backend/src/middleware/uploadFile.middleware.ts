import { MulterError } from "multer";
import { upload } from "@/config/multer.config";
import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";

export function uploadFile(req: Request, res: Response, next: NextFunction) {
    const handleErrorFileUpload = upload.array("image", 2);

    handleErrorFileUpload(req, res, (err) => {
        if (err instanceof MulterError) {
            switch (err.code) {
                case "LIMIT_FILE_SIZE":
                    next(new HttpException(413, "Fichier trop volumineux (10Mo maximum par fichier)"))
                    break;

                case "LIMIT_FILE_COUNT":
                    next(new HttpException(400, "Seulements 2 fichiers peuvent être envoyé simultanément"))
                    break;
            
                default:
                    next(new HttpException(400, `Une erreur de type ${err.code} est survenue lors du téléchargement de l'un de vos fichiers`))
                    break;
            }
        }
        else if(err instanceof Error) {           
            next(new HttpException(400, err.message));
        }

        next();
    })
}