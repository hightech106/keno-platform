import { drawKenoNumbers } from "../engine/draw";
import { countMatches } from "../engine/match";
import { calculatePayout } from "../engine/payout";

/**
 * Simulates Keno rounds and calculates RTP
 */
export function simulateRTP(
  picks: number,
  betAmount: number,
  rounds: number
) {
  let totalBet = 0;
  let totalPayout = 0;

  const playerNumbers = Array.from({ length: picks }, (_, i) => i + 1);

  for (let i = 0; i < rounds; i++) {
    const drawn = drawKenoNumbers();
    const matches = countMatches(playerNumbers, drawn);
    const win = calculatePayout(picks, matches, betAmount);

    totalBet += betAmount;
    totalPayout += win;
  }

  const rtp = (totalPayout / totalBet) * 100;
  const houseEdge = 100 - rtp;

  return {
    rounds,
    totalBet,
    totalPayout,
    rtp: Number(rtp.toFixed(2)),
    houseEdge: Number(houseEdge.toFixed(2))
  };
}
