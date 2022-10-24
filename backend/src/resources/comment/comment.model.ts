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
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        required: true
    }
}, { timestamps: true });

export default model<CommentDocument>('comments', CommentSchema);