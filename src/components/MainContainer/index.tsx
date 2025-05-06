import styles from "./styles.module.css";

type MainContainerProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export function MainContainer({ children, ...rest }: MainContainerProps) {
  return (
    <div className={styles.mainContainer} {...rest}>
      {children}
    </div>
  );
}
