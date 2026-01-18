import { z } from "zod";

export const placeBetSchema = z.object({
  numbers: z.array(z.number().min(1).max(80)).min(1).max(10),
  betAmount: z.number().positive()
});
