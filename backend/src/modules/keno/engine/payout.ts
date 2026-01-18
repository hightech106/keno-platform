/**
 * Example payout multipliers
 * Keys = matches
 * Value = multiplier
 */
const PAYOUT_TABLES: Record<number, Record<number, number>> = {
  1: { 1: 3 },
  2: { 2: 9 },
  3: { 2: 2, 3: 16 },
  4: { 2: 1, 3: 4, 4: 50 },
  5: { 3: 2, 4: 14, 5: 250 },
  6: { 3: 1, 4: 3, 5: 15, 6: 500 },
  7: { 4: 2, 5: 10, 6: 50, 7: 1000 },
  8: { 5: 4, 6: 20, 7: 200, 8: 5000 },
  9: { 5: 2, 6: 10, 7: 50, 8: 500, 9: 10000 },
  10: { 5: 2, 6: 5, 7: 20, 8: 100, 9: 1000, 10: 20000 }
};

/**
 * Calculates win amount
 */
export function calculatePayout(
  picks: number,
  matches: number,
  betAmount: number
): number {
  const table = PAYOUT_TABLES[picks];
  if (!table) return 0;

  const multiplier = table[matches] || 0;
  return betAmount * multiplier;
}
