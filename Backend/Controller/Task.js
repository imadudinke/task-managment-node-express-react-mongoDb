"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByAdmin = exports.getTasks = exports.deleteTask = exports.editTask = exports.createTask = void 0;
const Tasks_1 = require("../Models/Tasks");
const User_1 = require("../Models/User");
const createTask = async (req, res) => {
    console.log("Creating....");
    try {
        const { title, assignedTo, description } = req.body;
        const { userId: teamLeaderID } = req.params;
        console.log(title, assignedTo, teamLeaderID);
        if (!title || !teamLeaderID) {
            return res
                .status(400)
                .json({ success: false, message: "Title and teamLeaderID required" });
        }
        const newTask = await Tasks_1.Tasks.create({
            title,
            assignedTo,
            description,
            teamLeaderID,
        });
        console.log(newTask);
        return res.status(201).json({ success: true, task: newTask });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.createTask = createTask;
const editTask = async (req, res) => {
    try {
        const { title, taskId: id, description, status } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Title required" });
        }
        console.log(title, id);
        const task = await Tasks_1.Tasks.findOne({ id });
        console.log(task);
        if (!task) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        return res.status(200).json({ success: true, task });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.editTask = editTask;
// Delete task
const deleteTask = async (req, res) => {
    try {
        const { taskId: id } = req.body;
        const deleted = await Tasks_1.Tasks.findOneAndDelete({ id });
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteTask = deleteTask;
const getTasks = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const activeLeader = await User_1.User.findOne({ id });
        if (!activeLeader)
            res.status(404).json({ success: false, message: "Unknown user" });
        const allTasks = await Tasks_1.Tasks.find({ teamLeaderID: id });
        return res.status(200).json({
            success: true,
            allTasks,
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
exports.getTasks = getTasks;
const getTasksByAdmin = async (req, res) => {
    try {
        const { userId: id } = req.params;
        const activeAdmin = await User_1.User.findOne({ id });
        if (!activeAdmin)
            res.status(404).json({ success: false, message: "Unknown user" });
        const allTasks = await Tasks_1.Tasks.find();
        return res.status(200).json({
            success: true,
            allTasks,
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
exports.getTasksByAdmin = getTasksByAdmin;
//# sourceMappingURL=Task.js.map