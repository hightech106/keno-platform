import { Request, Response } from "express";
import { placeBetSchema } from "./keno.schema";
import { drawKenoNumbers } from "../engine/draw";
import { countMatches } from "../engine/match";
import { calculatePayout } from "../engine/payout";
import { WalletService } from "../../wallet/wallet.service";
import { logRound } from "../round/round.service";

export async function placeBet(req: Request, res: Response) {

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const userId = req.user!.id; // from JWT middleware

  try {
    const { numbers, betAmount } = placeBetSchema.parse(req.body);

    // 1️⃣ Debit
    const debitTx = WalletService.debit(userId, betAmount);

    // 2️⃣ Play game
    const drawnNumbers = drawKenoNumbers();
    const matches = countMatches(numbers, drawnNumbers);
    const winAmount = calculatePayout(
      numbers.length,
      matches,
      betAmount
    );

    // 3️⃣ Credit winnings
    let creditTx = null;
    if (winAmount > 0) {
      creditTx = WalletService.credit(userId, winAmount);
    }

    await logRound({
      operatorId: "DEFAULT_OPERATOR", // Phase 9 → dynamic
      userId,
      betAmount,
      numbers,
      drawnNumbers,
      matches,
      winAmount
    });

    res.json({
      debitTx,
      creditTx,
      numbers,
      drawnNumbers,
      matches,
      winAmount,
      balance: WalletService.getBalance(userId)
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
