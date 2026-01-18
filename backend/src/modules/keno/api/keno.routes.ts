import { Router } from "express";
import { placeBet } from "./keno.controller";
import { authenticate } from "../../auth/middleware/auth.middleware";

const router = Router();

router.post("/bet", authenticate, placeBet);

export default router;
