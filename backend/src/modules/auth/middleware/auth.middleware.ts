import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  function getJwtSecret(): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }
    return process.env.JWT_SECRET;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as {
      id: string;
      role: string;
    };

    // 🔑 THIS WAS MISSING OR WRONG
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
