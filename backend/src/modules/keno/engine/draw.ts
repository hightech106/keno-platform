import { secureRandomInt } from "./rng";

/**
 * Draws 20 unique numbers from 1–80
 */
export function drawKenoNumbers(): number[] {
  const pool = Array.from({ length: 80 }, (_, i) => i + 1);
  const drawn: number[] = [];

  while (drawn.length < 20) {
    const index = secureRandomInt(0, pool.length - 1);
    const number = pool.splice(index, 1)[0];
    drawn.push(number);
  }

  return drawn.sort((a, b) => a - b);
}
