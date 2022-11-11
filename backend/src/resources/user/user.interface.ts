import { Document, Schema } from 'mongoose';


export type UserID = Schema.Types.ObjectId;

export default interface User extends Document {
    pseudo: string; 
    language: string;
    email: string;
    thumbnail: string;
    password?: string;
    admin: boolean;
}