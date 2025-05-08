import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  PiggyBank,
  WalletCards,
} from "lucide-react";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";
import { BalanceCard } from "../BalanceCard";

import styles from "./styles.module.css";
import type { Screens } from "../../models/AccountModel";
import { Chart } from "../Chart";

export function MainCards() {
  const { view, setView, setScreen } = useContext(ViewContext);

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
      <div className={styles.inline}>
        <h1>Dashboard</h1>
        {view ? (
          <Eye onClick={() => setView(!view)} />
        ) : (
          <EyeOff onClick={() => setView(!view)} />
        )}
      </div>
      <div className={styles.gridContainer}>
        {cards.map((card, index) => {
          return (
            <BalanceCard
              key={index}
              onClick={() => setScreen(card.type as Screens)}
              title={card.title}
              color={card.color}
              type={card.type}
              icon={card.icon}
            ></BalanceCard>
          );
        })}
      </div>
      <h1>Visão Geral</h1>
      <Chart />
    </>
  );
}
