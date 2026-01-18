export interface WalletTransaction {
  transactionId: string;
  userId: string;
  amount: number;
  type: "DEBIT" | "CREDIT";
  status: "SUCCESS" | "FAILED";
}
