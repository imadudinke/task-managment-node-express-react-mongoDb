import { randomUUID } from "crypto";
import mongoose from "mongoose";
export interface ITask extends Document {
  id: string;
  teamLeaderID: string;
  title: string;
  assignedTo?: { teamId: string; teamName: string; assignedDate: string }[];
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
const schema = mongoose.Schema;
const taskSchema = new schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => randomUUID(),
      unique: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    description: {
      type: String,
      default: "",
    },
    teamLeaderID: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

export const Tasks: mongoose.Model<ITask> =
  (mongoose.models.Tasks as mongoose.Model<ITask>) ||
  mongoose.model<ITask>("Tasks", taskSchema);
