import mongoose from "mongoose";
export interface ITask extends Document {
    id: string;
    teamLeaderID: string;
    title: string;
    assignedTo?: {
        teamId: string;
        teamName: string;
        assignedDate: string;
    }[];
    status: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Tasks: mongoose.Model<ITask>;
//# sourceMappingURL=Tasks.d.ts.map