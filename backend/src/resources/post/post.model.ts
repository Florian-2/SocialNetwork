import { Schema, model } from 'mongoose';
import { PostDocument } from './post.interface';


const PostSchema = new Schema({
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
    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

export default model<PostDocument>('posts', PostSchema);