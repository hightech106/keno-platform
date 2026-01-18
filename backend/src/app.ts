import express, { Request, Response } from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import adminRoutes from "./modules/admin/admin.routes";
import kenoRoutes from "./modules/keno/api/keno.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/keno", kenoRoutes);

export default app;
