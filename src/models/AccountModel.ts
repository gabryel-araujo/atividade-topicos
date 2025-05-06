export type AccountModel = {
  id: string;
  name: string;
  balance: number;
  receipts: number;
  expenses: number;
  card: number;
  view: boolean;
};

export type AccountContextType = {
  accountData: AccountModel;
  setAccountData: React.Dispatch<React.SetStateAction<AccountModel>>;
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
};
