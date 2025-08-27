import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    id: string;
    name: string;
    password: string;
    role?: "admin" | "leader" | "team";
    email?: string;
    createdAt: Date;
}
export declare const User: mongoose.Model<IUser>;
//# sourceMappingURL=User.d.ts.map