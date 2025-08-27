"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.deleteLeader = exports.deleteTeam = exports.createTeam = exports.logOutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../Models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    try {
        const { name, password, email, role } = req.body;
        console.log(name, password, email, role);
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser)
            return res
                .status(409)
                .json({ success: false, message: "The user already exists" });
        if (!name || !password || !email)
            return res.status(400).json({ success: false });
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await User_1.User.create({
            name,
            email,
            password: hashPassword,
            role,
        });
        return res.status(201).json({ success: true, user: newUser });
    }
    catch (error) {
        console.log("Unable to Register: ", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        const activeUser = await User_1.User.findOne({ email });
        console.log(activeUser, "creddddddddd");
        if (!activeUser)
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        if (activeUser) {
            const isMatch = await bcrypt_1.default.compare(password, activeUser?.password);
            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });
            const token = jsonwebtoken_1.default.sign({
                userId: activeUser.id,
                name: activeUser.name,
                email: activeUser.email,
            }, process.env.JWT_SECRET || "1r43d43rfh58hg23urf7835hf738y5r578r34", { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true, // 🔒 Prevents JavaScript access
                // secure: false,
                // sameSite: "lax", // 🔒 Prevent CSRF
                // maxAge: 60 * 60 * 1000, // 1 hour
            });
            return res.status(200).json({
                message: "Login successful",
                userId: activeUser.id,
                token,
                name: activeUser.name,
                role: activeUser.role,
            });
        }
    }
    catch (error) {
        console.log("Unable to login :", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
const logOutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully" });
};
exports.logOutUser = logOutUser;
const createTeam = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const { name, password, email } = req.body;
        const activeLeader = await User_1.User.findOne({ id });
        console.log(activeLeader, "00000000000000000000000");
        if (!activeLeader)
            res.status(404).json({ success: false, message: "Unknown user" });
        if (!name || !password || !email)
            res
                .status(404)
                .json({ success: true, message: "Name ,password,email must provided" });
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newTeam = await User_1.User.create({
            name,
            email,
            password: hashPassword,
            role: "team",
        });
        res.status(201).json({ success: true, newTeam });
    }
    catch (error) {
        console.log("Unable to Register: ", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createTeam = createTeam;
const deleteTeam = async (req, res) => {
    try {
        const { teamId: id } = req.body;
        const deleted = await User_1.User.findOneAndDelete({ id });
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Team not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteTeam = deleteTeam;
const deleteLeader = async (req, res) => {
    try {
        const { leaderId: id } = req.body;
        const deleted = await User_1.User.findOneAndDelete({ id });
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Team not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteLeader = deleteLeader;
const createAdmin = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const { name, password, email } = req.body;
        const activeAdmin = await User_1.User.findOne({ id });
        console.log(name, password, email);
        if (!activeAdmin)
            res.status(404).json({ message: "Unknown User", success: false });
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser)
            return res
                .status(409)
                .json({ success: false, message: "The user already exists" });
        if (!name || !password || !email)
            return res.status(400).json({ success: false });
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newAdmin = await User_1.User.create({
            name,
            email,
            password: hashPassword,
            role: "admin",
        });
        return res.status(201).json({ success: true, user: newAdmin });
    }
    catch (error) {
        console.log("Unable to Register: ", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createAdmin = createAdmin;
//# sourceMappingURL=userAuth.js.map