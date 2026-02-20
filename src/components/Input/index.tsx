import styles from "./styles.module.css";

type InputProps = {
  id: string;
  labelText?: string;
  type?: "text" | "number" | "search";
} & React.ComponentProps<"input">;

export function Input({ id, labelText, type, ...props }: InputProps) {
  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      <input className={styles.input} id={id} type={type} {...props} />
    </>
  );
}
