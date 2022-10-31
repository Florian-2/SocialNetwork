import { Schema, model } from 'mongoose';

/*
    Pour liker un post/commentaire il suffira de crée un nouveau document like et de passer notre id à "iHaveLiked" (du model post ou comment) et d'incrémenter "likesCounter".

    Pour unlike un post/commentaire il suffira de supprimer le document like puis de retirer notre id de "iHaveLiked" et de décrémenter "likesCounter".
*/

const LikeSchema = new Schema({
    postOrComment_id: {
        type: Schema.Types.ObjectId,
        // ref: "posts",
        required: true
    },
    author_id: {
        type: Schema.Types.ObjectId,
        // ref: "users",
        required: true
    }
}, { timestamps: true });

export default model('likes', LikeSchema);