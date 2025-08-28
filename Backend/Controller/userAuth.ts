import { Request, Response } from "express";
import { User } from "../Models/User";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password, email, role } = req.body;
    console.log(name, password, email, role);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "The user already exists" });
    if (!name || !password || !email)
      return res.status(400).json({ success: false });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Unable to Register: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const activeUser = await User.findOne({ email });
    console.log(activeUser, "creddddddddd");

    if (!activeUser)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    if (activeUser) {
      const isMatch = await bcrypt.compare(password, activeUser?.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      const token = Jwt.sign(
        {
          userId: activeUser.id,
          name: activeUser.name,
          email: activeUser.email,
        },
        process.env.JWT_SECRET || "1r43d43rfh58hg23urf7835hf738y5r578r34",
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Login successful",
        userId: activeUser.id,
        token,
        name: activeUser.name,
        role: activeUser.role,
      });
    }
  } catch (error) {
    console.log("Unable to login :", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const { name, password, email } = req.body;

    const activeLeader = await User.findOne({ id });
    console.log(activeLeader, "00000000000000000000000");
    if (!activeLeader)
      res.status(404).json({ success: false, message: "Unknown user" });
    if (!name || !password || !email)
      res
        .status(404)
        .json({ success: true, message: "Name ,password,email must provided" });
    const hashPassword = await bcrypt.hash(password, 10);
    const newTeam = await User.create({
      name,
      email,
      password: hashPassword,
      role: "team",
    });

    res.status(201).json({ success: true, newTeam });
  } catch (error) {
    console.log("Unable to Register: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { teamId: id } = req.body;

    const deleted = await User.findOneAndDelete({ id });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteLeader = async (req: Request, res: Response) => {
  try {
    const { leaderId: id } = req.body;

    const deleted = await User.findOneAndDelete({ id });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const { name, password, email } = req.body;
    const activeAdmin = await User.findOne({ id });
    console.log(name, password, email);
    if (!activeAdmin)
      res.status(404).json({ message: "Unknown User", success: false });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "The user already exists" });
    if (!name || !password || !email)
      return res.status(400).json({ success: false });

    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
    });
    return res.status(201).json({ success: true, user: newAdmin });
  } catch (error) {
    console.log("Unable to Register: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
