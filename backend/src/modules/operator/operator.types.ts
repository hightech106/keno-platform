export interface OperatorConfig {
  payoutTable: Record<number, Record<number, number>>; // picks -> matches -> multiplier
  minBet: number;
  maxBet: number;
  houseEdge: number; // e.g., 0.11 for 11%
  currency: string;
  language: string;
  branding: {
    logoUrl: string;
    primaryColor: string;
  };
}
