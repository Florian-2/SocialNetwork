import { Document } from 'mongoose';

export default interface User extends Document {
    pseudo: string; 
    language: string;
    email: string;
    password: string;
}