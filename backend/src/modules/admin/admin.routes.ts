import { Router } from "express";
import { authenticate } from "../auth/middleware/auth.middleware";
import { requireRole } from "../auth/middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  requireRole("SUPER_ADMIN"),
  (_req, res) => {
    res.json({ message: "Welcome SUPER_ADMIN" });
  }
);

export default router;
