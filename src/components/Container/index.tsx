import styles from "./styles.module.css";

type ContainerProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  );
}
