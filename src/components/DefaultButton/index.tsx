import styles from "./styles.module.css";

type DefaultButtonProps = {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "olive";
} & React.ComponentProps<"div">;

export function DefaultButton({
  title,
  icon,
  color,
  ...rest
}: DefaultButtonProps) {
  return (
    <div className={`${styles.button} ${styles[color]}`} {...rest}>
      <h3>Adicionar {title}</h3>
      {icon}
    </div>
  );
}
