/**
 * Counts how many player-selected numbers
 * appear in the drawn numbers
 */
export function countMatches(
  playerNumbers: number[],
  drawnNumbers: number[]
): number {
  const drawnSet = new Set(drawnNumbers);
  return playerNumbers.filter(n => drawnSet.has(n)).length;
}
