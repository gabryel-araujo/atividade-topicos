import { useContext } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Card } from "../Card";
import styles from "./style.module.css";
import { ViewContext } from "../../contexts/ViewContext";

type BalanceCardProps = {
  title: string;
  icon: React.ReactNode;
  type: "balance" | "receipt" | "expense" | "card";
  color: "blue" | "green" | "red" | "olive";
};

export function BalanceCard({ title, icon, color, type }: BalanceCardProps) {
  const { view, accountData } = useContext(ViewContext);

  const getValue = () => {
    switch (type) {
      case "balance":
        return accountData.balance;
      case "receipt":
        return accountData.receipts;
      case "expense":
        return accountData.expenses;
      case "card":
        return accountData.card || 0; // Fallback para 0 se card for undefined
      default:
        return 0;
    }
  };

  const formatValue = (value: number) => {
    const formatted = formatCurrency(value);
    return view ? formatted : "******";
  };

  return (
    <Card>
      <section>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <h3>{formatValue(getValue())}</h3>
        </div>
        <span className={`${styles.arrowDiv} ${styles[color]}`}>{icon}</span>
      </section>
    </Card>
  );
}
