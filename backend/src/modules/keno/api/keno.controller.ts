import { Request, Response } from "express";
import { placeBetSchema } from "./keno.schema";
import { drawKenoNumbers } from "../engine/draw";
import { countMatches } from "../engine/match";
import { calculatePayout } from "../engine/payout";

export function placeBet(req: Request, res: Response) {
  try {
    const { numbers, betAmount } = placeBetSchema.parse(req.body);

    const drawnNumbers = drawKenoNumbers();
    const matches = countMatches(numbers, drawnNumbers);
    const winAmount = calculatePayout(
      numbers.length,
      matches,
      betAmount
    );

    res.json({
      betAmount,
      numbers,
      drawnNumbers,
      matches,
      winAmount
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
