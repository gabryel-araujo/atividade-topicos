import type { BillType } from "../types/types";

export type AccountModel = {
  id: string;
  name: string;
  balance: number;
  receipts: number;
  expenses: number;
  card: number;
  arrReceipts: BillType[];
  arrExpenses: BillType[];
  arrCard: BillType[];
};

export type Screens = "main" | "receipt" | "expense" | "balance";

export type AccountContextType = {
  accountData: AccountModel;
  setAccountData: React.Dispatch<React.SetStateAction<AccountModel>>;
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<Screens>>;
};
