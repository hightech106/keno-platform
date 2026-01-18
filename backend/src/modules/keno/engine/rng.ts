import crypto from "crypto";

/**
 * Generates a cryptographically secure random integer
 * between min (inclusive) and max (inclusive)
 */
export function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const randomBytes = crypto.randomBytes(4);
  const randomValue = randomBytes.readUInt32BE(0);

  return min + (randomValue % range);
}
