import { Plus } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import styles from "./style.module.css";
import { Card } from "../Card";
import { useContext, useState } from "react";
import { ViewContext } from "../../contexts/ViewContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Container } from "../Container";
import { Modal } from "../Modal";
import { TransactionDict } from "../../types/types";
import { ExpenseChart } from "../ExpenseChart";
import { Toaster } from "sonner";

type Color = "blue" | "green" | "red" | "olive";

type EditTransactionProps = {
  type: "receipt" | "expense" | "balance" | "card";
};

export function EditTransaction({ type }: EditTransactionProps) {
  const { accountData } = useContext(ViewContext);
  const [open, setOpen] = useState(false);

  const newTitle =
    type !== "card" ? `${TransactionDict[type].title}s` : "Cartão de crédito";

  const labelButton =
    type !== "card" ? `${TransactionDict[type].title}` : "despesa de cartão";

  return (
    <>
      <Toaster richColors position="top-center" />
      <Modal open={open} setOpen={setOpen} type={type} />
      <div className={styles.inline}>
        <h1 className={`${styles[type]}`}>{newTitle}</h1>
        {type !== "balance" && (
          <DefaultButton
            title={labelButton}
            icon={<Plus color="white" />}
            color={TransactionDict[type].color as Color}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {type === "balance" && (
        <Card>
          <Container>
            <div>
              <h2>{TransactionDict[type].title} em conta:</h2>
              <h2>{formatCurrency(accountData.balance)}</h2>
            </div>
          </Container>
        </Card>
      )}

      {type === "receipt" && (
        <Card>
          <h2 className={styles[type]}>Extrato de Receitas</h2>
          {accountData.arrReceipts.map((receipt) => {
            return (
              <div className={styles.field}>
                <p className={styles.title}>{receipt.title}</p>
                <p className={`${styles.currency} ${styles[type]}`}>
                  {formatCurrency(receipt.value)}
                </p>
              </div>
            );
          })}
        </Card>
      )}

      {type === "expense" && (
        <Card>
          <h2 className={styles[type]}>Extrato de Despesas</h2>
          {accountData.arrExpenses.map((expense) => {
            return (
              <div className={styles.field}>
                <p className={styles.title}>{expense.title}</p>
                <p className={`${styles.currency} ${styles[type]}`}>
                  {formatCurrency(expense.value)}
                </p>
              </div>
            );
          })}
        </Card>
      )}

      {type === "card" && (
        <Card>
          <h2 className={styles[type]}>Despesas do cartão de crédito</h2>
          {accountData.arrCard.map((card) => {
            return (
              <div className={styles.field}>
                <p className={styles.title}>{card.title}</p>
                <p className={`${styles.currency} ${styles[type]}`}>
                  {formatCurrency(card.value)}
                </p>
              </div>
            );
          })}
        </Card>
      )}
      {type === "expense" && <ExpenseChart />}
    </>
  );
}
