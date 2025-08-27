"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const taskSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: () => (0, crypto_1.randomUUID)(),
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
}, { timestamps: true });
exports.Tasks = mongoose_1.default.models.Tasks ||
    mongoose_1.default.model("Tasks", taskSchema);
//# sourceMappingURL=Tasks.js.map