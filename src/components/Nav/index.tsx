import { Coins, UserCircle } from "lucide-react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ViewContext } from "../../contexts/ViewContext";

export default function Nav() {
  const { accountData } = useContext(ViewContext);

  return (
    <div className={styles.nav}>
      <Coins color="orange" />
      <section>
        <UserCircle color="orange" />
        <p>{accountData.name}</p>
      </section>
    </div>
  );
}
