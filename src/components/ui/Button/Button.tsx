import s from "./Button.module.scss";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  size?: "default" | "large" | "small" |"header";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  size = "default",
  disabled = false,
  className = "",
  tabIndex,
  onClick,
}) => {
  const styles = `${s.button} ${size && s[`button_${size}`]} ${className}`;

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {label}
    </button>
  );
};

export default Button;
