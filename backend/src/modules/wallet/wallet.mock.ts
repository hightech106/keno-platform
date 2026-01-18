import crypto from "crypto";
import { WalletTransaction } from "./wallet.types";

const balances = new Map<string, number>();

export function getBalance(userId: string): number {
  return balances.get(userId) ?? 1000;
}

export function debit(
  userId: string,
  amount: number
): WalletTransaction {
  const balance = getBalance(userId);

  if (balance < amount) {
    throw new Error("INSUFFICIENT_FUNDS");
  }

  balances.set(userId, balance - amount);

  return {
    transactionId: crypto.randomUUID(),
    userId,
    amount,
    type: "DEBIT",
    status: "SUCCESS"
  };
}

export function credit(
  userId: string,
  amount: number
): WalletTransaction {
  const balance = getBalance(userId);

  balances.set(userId, balance + amount);

  return {
    transactionId: crypto.randomUUID(),
    userId,
    amount,
    type: "CREDIT",
    status: "SUCCESS"
  };
}
