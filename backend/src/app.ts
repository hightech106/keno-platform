import express, { Request, Response } from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);

export default app;
