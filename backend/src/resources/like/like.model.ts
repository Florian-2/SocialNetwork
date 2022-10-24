import { Schema, model } from 'mongoose';


const LikeSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

export default model('posts', LikeSchema);