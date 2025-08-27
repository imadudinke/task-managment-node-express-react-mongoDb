"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasksAssigned = exports.getAllUsers = exports.getTeamDataByLeader = exports.getLeadersDataByAdmin = exports.getTeamData = exports.getLeaderData = exports.getAdminData = exports.getRequestToLeader = void 0;
const User_1 = require("../Models/User");
const Tasks_1 = require("../Models/Tasks");
const getRequestToLeader = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const admin = await User_1.User.findOne({ id });
        if (!admin)
            return res
                .status(404)
                .json({ success: false, message: "Admin doesn't exist" });
        const requested = await User_1.User.find({ role: { $in: ["request", " ", ""] } });
        return res.status(200).json({ success: true, requested });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getRequestToLeader = getRequestToLeader;
const getAdminData = async (req, res) => {
    try {
        const { userId: id } = req.params;
        console.log("FInding ActiveUser");
        const activeAdmin = await User_1.User.findOne({ id });
        console.log(activeAdmin, "_________________________");
        if (!activeAdmin)
            return res.status(404).json({ success: false, message: "Unknown User" });
        return res.status(200).json({ success: true, activeAdmin });
    }
    catch (error) {
        console.log("Unable to login :", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAdminData = getAdminData;
const getLeaderData = async (req, res) => {
    try {
        const { userId: id } = req.params;
        console.log("FInding ActiveUser");
        const activeLeader = await User_1.User.findOne({ id });
        if (!activeLeader)
            return res.status(404).json({ success: false, message: "Unknown User" });
        return res.status(200).json({ success: true, activeLeader });
    }
    catch (error) {
        console.log("Unable to login :", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getLeaderData = getLeaderData;
const getTeamData = async (req, res) => {
    try {
        const { userId: id } = req.params;
        console.log("FInding ActiveUser");
        const activeTeam = await User_1.User.findOne({ id });
        if (!activeTeam)
            return res.status(404).json({ success: false, message: "Unknown User" });
        return res.status(200).json({ success: true, activeTeam });
    }
    catch (error) {
        console.log("Unable to login :", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getTeamData = getTeamData;
const getLeadersDataByAdmin = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const admin = await User_1.User.findOne({ id });
        if (!admin)
            return res
                .status(404)
                .json({ success: false, message: "Admin doesn't exist" });
        const leaders = await User_1.User.find({ role: "leader" });
        return res.status(200).json({ success: true, leaders });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getLeadersDataByAdmin = getLeadersDataByAdmin;
const getTeamDataByLeader = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const activeLeader = await User_1.User.findOne({ id });
        if (!activeLeader)
            res.status(404).json({ success: false, message: "Unknown user" });
        const allTeam = await User_1.User.find({ role: "team" });
        console.log(allTeam);
        return res.status(200).json({
            success: true,
            allTeam,
        });
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getTeamDataByLeader = getTeamDataByLeader;
const getAllUsers = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const admin = await User_1.User.findOne({ id });
        if (!admin) {
            return res
                .status(404)
                .json({ success: false, message: "Admin doesn't exist" });
        }
        // ✅ get all users
        const allUsers = await User_1.User.find();
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users: allUsers,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getAllUsers = getAllUsers;
const getAllTasksAssigned = async (req, res) => {
    try {
        const { userId: id } = req.params;
        console.log(id, "+OOOOOOOOOOOOOOO");
        const activeTeam = await User_1.User.findOne({ id });
        if (!activeTeam) {
            return res
                .status(404)
                .json({ success: false, message: "activeTeam doesn't exist" });
        }
        const tasks = await Tasks_1.Tasks.find({ "assignedTo.id": id });
        console.log(tasks);
        res.status(200).json({ success: true, tasks });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getAllTasksAssigned = getAllTasksAssigned;
//# sourceMappingURL=getData.js.map