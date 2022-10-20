"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    pseudo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        require: true
    }
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash; // this = user
    next();
});
exports.default = (0, mongoose_1.model)('users', UserSchema);
