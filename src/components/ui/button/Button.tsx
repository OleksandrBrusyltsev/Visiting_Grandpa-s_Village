import styles from "./Button.module.scss";

type ButtonProps = {
  padding: string;
  fontSize: string;
  backgroundColor: string;
  border: string;
  color: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  padding,
  fontSize,
  backgroundColor,
  border,
  color,
  children,
}) => {
  const style = {
    padding,
    fontSize,
    backgroundColor,
    border,
    color,
  };

  return (
    <button style={style} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
