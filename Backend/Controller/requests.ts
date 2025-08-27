import { Request, Response } from "express";
import { User } from "../Models/User";

export const acceptRequest = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;

    if (!id || !role) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and role are required" });
    }

    let updatedUser;

    if (role === "leader") {
      // Accept as leader
      updatedUser = await User.findOneAndUpdate(
        { id },
        { role: "leader" },
        { new: true }
      );
    } else {
      // Reject or handle other roles
      updatedUser = await User.findOneAndUpdate(
        { id },
        { role: "rejected" },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error in acceptRequest:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
