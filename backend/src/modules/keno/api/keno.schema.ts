import { z } from "zod";

// Multi-operator Keno bet validation
export const placeBetSchema = z.object({
  operatorId: z
    .string()
    .nonempty("operatorId is required"), // ensures operatorId is a string and not empty

  numbers: z
    .array(
      z
        .number()
        .min(1, "Numbers must be between 1 and 80")
        .max(80, "Numbers must be between 1 and 80")
    )
    .min(1, "Select at least 1 number")
    .max(10, "Select at most 10 numbers"),

  betAmount: z
    .number()
    .min(1, "Bet amount must be at least 1")
});
