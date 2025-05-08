import { useEffect, useMemo, useState } from "react";
import { ViewContext } from "./ViewContext";
import type { AccountModel, Screens } from "../models/AccountModel";

type ViewContextProvierProps = {
  children: React.ReactNode;
};

export function ViewContextProvier({ children }: ViewContextProvierProps) {
  const [view, setView] = useState(true);
  const [screen, setScreen] = useState<Screens>("main");

  const [accountData, setAccountData] = useState<AccountModel>(() => {
    const dataStorage = localStorage.getItem("user-data");
    return dataStorage
      ? JSON.parse(dataStorage)
      : {
          id: "1",
          name: "Usuário",
          balance: 0,
          receipts: 0,
          expenses: 0,
          card: 0,
          arrReceipts: [],
          arrExpenses: [],
          arrCard: [],
        };
  });

  const newBalance = accountData.arrReceipts.reduce(
    (total, receipt) => total + receipt.value,
    0
  );

  const newExpenses = accountData.arrExpenses.reduce(
    (total, expense) => total + expense.value,
    0
  );

  const newCard = accountData.arrCard.reduce(
    (total, card) => total + card.value,
    0
  );

  const computedAccountData = useMemo(
    () => ({
      ...accountData,
      balance: newBalance - newExpenses - newCard,
      receipts: newBalance,
      expenses: newExpenses,
      card: newCard,
    }),
    [accountData, newBalance, newCard, newExpenses]
  );

  const contextValue = useMemo(
    () => ({
      accountData: computedAccountData,
      setAccountData,
      view,
      setView,
      screen,
      setScreen,
    }),
    [view, screen, computedAccountData]
  );

  useEffect(() => {
    console.log(accountData);
    localStorage.setItem("user-data", JSON.stringify(accountData));
  }, [accountData]);

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
}
