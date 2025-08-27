import { Request, Response } from "express";
import { User } from "../Models/User";
import { Tasks } from "../Models/Tasks";
export const getRequestToLeader = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const admin = await User.findOne({ id });
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin doesn't exist" });
    const requested = await User.find({ role: { $in: ["request", " ", ""] } });
    return res.status(200).json({ success: true, requested });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminData = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    console.log("FInding ActiveUser");
    const activeAdmin = await User.findOne({ id });
    console.log(activeAdmin, "_________________________");
    if (!activeAdmin)
      return res.status(404).json({ success: false, message: "Unknown User" });
    return res.status(200).json({ success: true, activeAdmin });
  } catch (error) {
    console.log("Unable to login :", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getLeaderData = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    console.log("FInding ActiveUser");
    const activeLeader = await User.findOne({ id });
    if (!activeLeader)
      return res.status(404).json({ success: false, message: "Unknown User" });
    return res.status(200).json({ success: true, activeLeader });
  } catch (error) {
    console.log("Unable to login :", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getTeamData = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    console.log("FInding ActiveUser");
    const activeTeam = await User.findOne({ id });
    if (!activeTeam)
      return res.status(404).json({ success: false, message: "Unknown User" });
    return res.status(200).json({ success: true, activeTeam });
  } catch (error) {
    console.log("Unable to login :", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLeadersDataByAdmin = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const admin = await User.findOne({ id });
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin doesn't exist" });
    const leaders = await User.find({ role: "leader" });
    return res.status(200).json({ success: true, leaders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamDataByLeader = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const activeLeader = await User.findOne({ id });
    if (!activeLeader)
      res.status(404).json({ success: false, message: "Unknown user" });
    const allTeam = await User.find({ role: "team" });
    console.log(allTeam);
    return res.status(200).json({
      success: true,
      allTeam,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;

    const admin = await User.findOne({ id });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin doesn't exist" });
    }

    // ✅ get all users
    const allUsers = await User.find();

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllTasksAssigned = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    console.log(id, "+OOOOOOOOOOOOOOO");
    const activeTeam = await User.findOne({ id });
    if (!activeTeam) {
      return res
        .status(404)
        .json({ success: false, message: "activeTeam doesn't exist" });
    }
    const tasks = await Tasks.find({ "assignedTo.id": id });
    console.log(tasks);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
