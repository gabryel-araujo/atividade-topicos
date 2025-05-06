import { useState } from "react";
import { MainContainer } from "../MainContainer";
import styles from "./styles.module.css";
import { formatCurrency } from "../../utils/formatCurrency";
import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";

export function Balance() {
  const [view, setView] = useState(true);
  const [recipt, setRecipt] = useState(12476.9);
  const [expense, setExpense] = useState(5);
  const balanceUpdt = recipt - expense;
  const [balance, setBalance] = useState(balanceUpdt);

  const formattedBalance = formatCurrency(balance);
  const formattedRecipt = formatCurrency(recipt);
  const formattedExpense = formatCurrency(expense);
  return (
    <MainContainer>
      <h3>Saldo em conta</h3>
      <div className={styles.inline}>
        <h1>
          {!view
            ? formattedBalance.replace(formattedBalance, "******")
            : formattedBalance}
        </h1>
        {view ? (
          <Eye onClick={() => setView(!view)} />
        ) : (
          <EyeOff onClick={() => setView(!view)} />
        )}
      </div>
      <div className={styles.balanceStatus}>
        <section>
          <span className={`${styles.arrowDiv} ${styles.green}`}>
            <ArrowUp color="white" />
          </span>
          <div>
            <h2>Receitas</h2>
            <p>
              {!view
                ? formattedRecipt.replace(formattedRecipt, "******")
                : formattedRecipt}
            </p>
          </div>
        </section>
        <section>
          <span className={`${styles.arrowDiv} ${styles.red}`}>
            <ArrowDown color="white" />
          </span>
          <div>
            <h3>Despesas</h3>
            <p>
              {!view
                ? formattedExpense.replace(formattedExpense, "******")
                : formattedExpense}
            </p>
          </div>
        </section>
      </div>
    </MainContainer>
  );
}
