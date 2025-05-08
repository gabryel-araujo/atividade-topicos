import { Coins, UserCircle } from "lucide-react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";

export default function Nav() {
  const { accountData, setScreen } = useContext(ViewContext);

  return (
    <div className={styles.nav}>
      <section className={styles.homeSection} onClick={() => setScreen("main")}>
        <Coins color="orange" />
        <h1 className={styles.title}>Coin Exchange</h1>
      </section>
      <section>
        <UserCircle color="orange" />
        <h2>{accountData.name}</h2>
      </section>
    </div>
  );
}
