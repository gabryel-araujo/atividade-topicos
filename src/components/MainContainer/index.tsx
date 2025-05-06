import styles from "./styles.module.css";

type MainContainerProps = {
  children: React.ReactNode;
};

export function MainContainer({ children }: MainContainerProps) {
  return <div className={styles.mainContainer}>{children}</div>;
}
