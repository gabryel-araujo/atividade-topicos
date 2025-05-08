import { createContext } from "react";
import type { AccountContextType } from "../models/AccountModel";

const initialValue: AccountContextType = {
  accountData: {
    id: "1",
    name: "Gabryel",
    balance: 1,
    receipts: 1,
    expenses: 1,
    card: 1,
    arrReceipts: [],
    arrExpenses: [],
    arrCard: [],
  },
  setAccountData: () => {},
  view: false,
  setView: () => {},
  screen: "main",
  setScreen: () => {},
};

export const ViewContext = createContext<AccountContextType>(initialValue);
