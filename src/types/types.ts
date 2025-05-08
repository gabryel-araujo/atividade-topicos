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
  card: {
    title: "Cartão de crédito",
    color: "olive",
  },
};

export const categoriesData = [
  "Salário",
  "Custos fixos",
  "Investimento",
  "Educação",
  "Lazer",
  "Transporte",
  "Outros",
];

export type Categories =
  | "Salário"
  | "Custos fixos"
  | "Investimento"
  | "Educação"
  | "Lazer"
  | "Transporte"
  | "Outros";

export type BillType = {
  title: string;
  value: number;
  category: Categories;
};
