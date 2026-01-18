import { KenoRoundModel } from "./round.model";

export async function logRound(data: {
  operatorId: string;
  userId: string;
  betAmount: number;
  numbers: number[];
  drawnNumbers: number[];
  matches: number;
  winAmount: number;
}) {
  if (!data.userId) {
    throw new Error("Cannot log round: missing userId");
  }
  return KenoRoundModel.create(data);
}
