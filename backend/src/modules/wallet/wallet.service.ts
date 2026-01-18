import * as wallet from "./wallet.mock";

export const WalletService = {
  debit: wallet.debit,
  credit: wallet.credit,
  getBalance: wallet.getBalance
};
