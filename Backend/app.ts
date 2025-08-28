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
  // task-managment-node-express-react-m.vercel.app

  const allowedOrigins = [
    "https://task-managment-node-express-react-m.vercel.app",
    "http://localhost:5173",
  ];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use("/", route);

  app.listen(PORT, () => {
    console.log(`The server is running: ${PORT} `);
  });
};
startServer();
