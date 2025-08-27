import Express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv";
import route from "./Routes/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = Express();
app.use(Express.json());
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  console.log("starting server...");
  await connectDB();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(cookieParser());
  app.use("/", route);

  app.listen(PORT, () => {
    console.log(`The server is running: ${PORT} `);
  });
};
startServer();
