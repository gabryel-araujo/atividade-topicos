export const TransactionDict = {
  receipt: {
    title: "Receita",
    color: "green",
  },
  expense: {
    title: "Despesa",
    color: "red",
  },
  balance: {
    title: "Saldo",
    color: "blue",
  },
};

export type BillType = { title: string; value: number };
