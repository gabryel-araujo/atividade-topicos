import { Coins, UserCircle } from "lucide-react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";
import { toast, Toaster } from "sonner";

export default function Nav() {
  const { accountData, setScreen } = useContext(ViewContext);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className={styles.nav}>
        <section className={styles.action} onClick={() => setScreen("main")}>
          <Coins color="orange" />
          <h1 className={styles.title}>Coin Exchange</h1>
        </section>
        <section
          className={styles.action}
          onClick={() => toast.warning("Função indisponível no momento")}
        >
          <UserCircle color="orange" />
          <h2 className={styles.title}>{accountData.name}</h2>
        </section>
      </div>
    </>
  );
}
