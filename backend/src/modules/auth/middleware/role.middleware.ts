import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function requireRole(role: "SUPER_ADMIN" | "OPERATOR_ADMIN") {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.admin.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}
