import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieHeader = req.headers.cookie; // e.g. "token=abc123; other=value"
    const cookies: Record<string, string> = {};

    cookieHeader?.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        cookies[key] = value;
      }
    });

    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET || "1r43d43rfh58hg23urf7835hf738y5r578r34"
    );
    console.log(decoded, "------------decoded");
    (req as any).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
