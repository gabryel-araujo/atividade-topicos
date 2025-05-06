import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  PiggyBank,
  WalletCards,
} from "lucide-react";
import { Container } from "../../components/Container";
import Nav from "../../components/Nav";
import styles from "./style.module.css";
import { useContext } from "react";
import { BalanceCard } from "../../components/BalanceCard";
import { ViewContext } from "../../contexts/ViewContext";

export function Home() {
  const { view, setView } = useContext(ViewContext);

  type cardTypes = {
    title: string;
    type: "balance" | "receipt" | "expense" | "card";
    color: "blue" | "green" | "red" | "olive";
    icon: React.ReactNode;
  };

  const cards: cardTypes[] = [
    {
      title: "Saldo",
      color: "blue",
      type: "balance",
      icon: <PiggyBank color="white" />,
    },
    {
      title: "Receitas",
      color: "green",
      type: "receipt",
      icon: <ArrowUp color="white" />,
    },
    {
      title: "Despesas",
      color: "red",
      type: "expense",
      icon: <ArrowDown color="white" />,
    },
    {
      title: "Cartão de Crédito",
      color: "olive",
      type: "card",
      icon: <WalletCards color="white" />,
    },
  ];

  return (
    <>
      <Nav />
      <Container>
        <div className={styles.inline}>
          <h1>Dashboard</h1>
          {view ? (
            <Eye onClick={() => setView(!view)} />
          ) : (
            <EyeOff onClick={() => setView(!view)} />
          )}
        </div>
        <div className={styles.gridContainer}>
          {cards.map((card) => {
            return (
              <BalanceCard
                title={card.title}
                color={card.color}
                type={card.type}
                icon={card.icon}
              ></BalanceCard>
            );
          })}
        </div>
      </Container>
    </>
  );
}
