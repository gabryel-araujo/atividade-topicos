import { useMemo, useState } from "react";
import { ViewContext } from "./ViewContext";
import type { AccountModel } from "../models/AccountModel";

type ViewContextProvierProps = {
  children: React.ReactNode;
};

export function ViewContextProvier({ children }: ViewContextProvierProps) {
  const [view, setView] = useState(true);

  const [accountData, setAccountData] = useState<AccountModel>({
    id: "1",
    name: "Gabryel",
    balance: 3000,
    receipts: 3000,
    expenses: 400,
    card: 350,
    view,
  });

  const contextValue = useMemo(
    () => ({
      accountData,
      setAccountData,
      view,
      setView,
    }),
    [accountData, view]
  );

  return (
    <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>
  );
}
