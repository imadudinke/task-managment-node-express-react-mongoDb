import { randomUUID } from "crypto";
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  password: string;
  role?: "admin" | "leader" | "team";
  email?: string;
  createdAt: Date;
}

const schema = mongoose.Schema;
const userSchema = new schema<IUser>({
  id: {
    type: String,
    default: () => randomUUID(),
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: false,
    default: "request",
  },
});

export const User: mongoose.Model<IUser> =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
