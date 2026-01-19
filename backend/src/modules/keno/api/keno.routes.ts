import { Router } from "express";
import { placeBet } from "./keno.controller";
import { authenticate } from "../../auth/middleware/auth.middleware";

const router = Router();

/**
 * POST /api/keno/bet
 * Body: { operatorId, numbers, betAmount }
 * Protected route
 */
router.post("/bet", authenticate, placeBet);

export default router;
