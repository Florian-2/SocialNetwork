import multer from 'multer'
import path from 'path';

const availableMimeType= [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
];

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, path.join(__dirname, "../upload", "images"));
    },
    filename(_req, file, cb) {       
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 10_485_760, // 10Mo 10_485_760
        files: 2,
        fields: 1
    },
    fileFilter(_req, file, cb) {
        if (!availableMimeType.includes(file.mimetype)) {
            cb(new Error("Seules les formats png/jpg/jpeg/webp sont autorisés"));
        }
        else {
            cb(null, true);
        }
    }
});