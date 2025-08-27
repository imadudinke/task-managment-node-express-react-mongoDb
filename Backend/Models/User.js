"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const userSchema = new schema({
    id: {
        type: String,
        default: () => (0, crypto_1.randomUUID)(),
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
exports.User = mongoose_1.default.models.User ||
    mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map