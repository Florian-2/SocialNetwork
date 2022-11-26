import { Schema, model } from 'mongoose';
import { PostDocument } from './post.interface';


const PostSchema = new Schema({
    message: {
        type: String,
        required: false,
        maxlength: [300, "300 caractères maximum"]
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

export default model<PostDocument>('posts', PostSchema);