import mongoose from "mongoose";
import "dotenv";
let isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Connected Successfully...");
    isConnected = true;
  } catch (error) {
    console.error("❌ Failed to connect MongoDB:", error);
    process.exit(1);
  }
};
