import styles from "./styles.module.css";

type CardProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export function Card({ children, ...rest }: CardProps) {
  return (
    <div className={styles.card} {...rest}>
      {children}
    </div>
  );
}
