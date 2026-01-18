import { Request, Response } from "express";
import { adminRegisterSchema, adminLoginSchema } from "./auth.schema";
import { registerAdmin, loginAdmin } from "./auth.service";

export async function register(req: Request, res: Response) {
  try {
    const data = adminRegisterSchema.parse(req.body);
    await registerAdmin(data.email, data.password);
    res.status(201).json({ message: "Admin created" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = adminLoginSchema.parse(req.body);
    const token = await loginAdmin(data.email, data.password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
