import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from './user.interface';

const UserSchema = new Schema<User>({
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        require: false,
        default: "thumbnail/default_profile.png"
    },
    language: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        require: false,
        default: false
    }
}, { timestamps: true });

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash; // this = user
        next();
    }
});

export default model<User>('users', UserSchema);