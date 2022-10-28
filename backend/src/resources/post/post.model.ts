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
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    comments: { 
        type: [Schema.Types.ObjectId], 
        ref: "comments" 
    },
    likers: { 
        type: [Schema.Types.ObjectId],
        require: true
    }

}, { timestamps: true });

export default model<PostDocument>('posts', PostSchema);