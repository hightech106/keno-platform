import { Request, Response } from "express";
import { placeBetSchema } from "./keno.schema";

import { drawKenoNumbers } from "../engine/draw";
import { countMatches } from "../engine/match";
import { WalletService } from "../../wallet/wallet.service";
import { logRound } from "../round/round.service";
import { OperatorService } from "../../operator/operator.service";

/**
 * POST /api/keno/bet
 * Multi-operator aware
 * Protected route (requires authenticate middleware)
 */
export async function placeBet(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const userId = req.user.id;

  try {
    // 1️⃣ Validate request body
    const { numbers, betAmount, operatorId } = placeBetSchema.parse(req.body);

    // 2️⃣ Fetch operator and validate
    const operator = await OperatorService.getOperatorById(operatorId);
    if (!operator.isActive) throw new Error("Operator is inactive");

    const { minBet, maxBet, payoutTable, houseEdge } = operator.config;

    // 3️⃣ Validate bet amount
    if (betAmount < minBet || betAmount > maxBet)
      throw new Error(`Bet must be between ${minBet} and ${maxBet}`);

    // 4️⃣ Debit wallet
    const debitTx = WalletService.debit(userId, betAmount);

    // 5️⃣ Draw numbers
    const drawnNumbers = drawKenoNumbers();

    // 6️⃣ Count matches
    const matches = countMatches(numbers, drawnNumbers);

    // 7️⃣ Calculate win amount using operator's payout table
    const winMultiplier = payoutTable[numbers.length]?.[matches] ?? 0;
    const winAmount = Math.floor(betAmount * winMultiplier);

    // 8️⃣ Credit wallet if win > 0
    let creditTx = null;
    if (winAmount > 0) creditTx = WalletService.credit(userId, winAmount);

    // 9️⃣ Log the round
    await logRound({
      operatorId,
      userId,
      betAmount,
      numbers,
      drawnNumbers,
      matches,
      winAmount
    });

    // 🔟 Respond
    return res.json({
      operatorId,
      debitTx,
      creditTx,
      numbers,
      drawnNumbers,
      matches,
      winAmount,
      balance: WalletService.getBalance(userId)
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
