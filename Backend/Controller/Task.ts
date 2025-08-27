import { Request, Response } from "express";
import { Tasks } from "../Models/Tasks";
import { User } from "../Models/User";
export const createTask = async (req: Request, res: Response) => {
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

    const newTask = await Tasks.create({
      title,
      assignedTo,
      description,
      teamLeaderID,
    });
    console.log(newTask);
    return res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { title, taskId: id, description, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title required" });
    }
    console.log(title, id);

    const task = await Tasks.findOne({ id });
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
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId: id } = req.body;

    const deleted = await Tasks.findOneAndDelete({ id });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const activeLeader = await User.findOne({ id });
    if (!activeLeader)
      res.status(404).json({ success: false, message: "Unknown user" });
    const allTasks = await Tasks.find({ teamLeaderID: id });
    return res.status(200).json({
      success: true,
      allTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTasksByAdmin = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const activeAdmin = await User.findOne({ id });
    if (!activeAdmin)
      res.status(404).json({ success: false, message: "Unknown user" });
    const allTasks = await Tasks.find();
    return res.status(200).json({
      success: true,
      allTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
