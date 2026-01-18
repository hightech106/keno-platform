import { Router } from "express";
import { authenticate } from "../auth/middleware/auth.middleware";
import { authorizeRole } from "../auth/middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRole("SUPER_ADMIN"),
  (_req, res) => {
    res.json({ message: "Welcome SUPER_ADMIN" });
  }
);

export default router;
