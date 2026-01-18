import { z } from "zod";

export const adminRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
