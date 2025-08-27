"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie; // e.g. "token=abc123; other=value"
        const cookies = {};
        cookieHeader?.split(";").forEach((cookie) => {
            const [key, value] = cookie.trim().split("=");
            if (key && value) {
                cookies[key] = value;
            }
        });
        const token = cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "1r43d43rfh58hg23urf7835hf738y5r578r34");
        console.log(decoded, "------------decoded");
        req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authMiddleware.js.map