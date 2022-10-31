import { Schema, model } from 'mongoose';
import { CommentDocument } from './comment.interface';


const CommentSchema = new Schema({
    message: {
        type: String,
        required: [true, "Message requis"],
        trim: true,
        maxlength: [250, "Vous êtes limité à 250 caractères"]
    },
    images: {
        type: [Object],
        maxlength: 2,
        required: false,
    },
    post_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        pseudo: {
            type: String,
            required: true
        }
    },
    likesCounter: {
        type: Number,
        require: false,
        default: 0
    },
    iHaveLiked: {
        type: String,
        require: false,
        default: ""
    }
}, { timestamps: true });

export default model<CommentDocument>('comments', CommentSchema);