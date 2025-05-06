import { MainContainer } from "../../components/MainContainer";
import styles from "./style.module.css";

import { Eye } from "lucide-react";

export function Home() {
  return (
    <MainContainer>
      <p>Saldo em conta</p>
      <div className={styles.inline}>
        <p>12.476,90</p>
        <Eye />
      </div>
    </MainContainer>
  );
}
