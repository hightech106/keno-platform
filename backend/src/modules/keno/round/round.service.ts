import { KenoRoundModel } from "./round.model";
import { v4 as uuidv4 } from "uuid";

interface RoundLog {
  operatorId: string;
  userId: string;
  betAmount: number;
  numbers: number[];
  drawnNumbers: number[];
  matches: number;
  winAmount: number;
}

export async function logRound(round: RoundLog) {
  // 1️⃣ Generate unique round ID
  const roundId = uuidv4();

  // 2️⃣ Save to DB
  const newRound = new KenoRoundModel({
    roundId,
    operatorId: round.operatorId,
    userId: round.userId,
    betAmount: round.betAmount,
    numbers: round.numbers,
    drawnNumbers: round.drawnNumbers,
    matches: round.matches,
    winAmount: round.winAmount,
    createdAt: new Date()
  });

  return await newRound.save();
}
