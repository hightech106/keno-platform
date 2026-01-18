export interface KenoRound {
  operatorId: string;
  userId: string;
  betAmount: number;
  numbers: number[];
  drawnNumbers: number[];
  matches: number;
  winAmount: number;
  createdAt: Date;
}
