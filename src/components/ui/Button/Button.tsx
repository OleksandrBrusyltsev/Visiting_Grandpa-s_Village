import s from "./Button.module.scss";

<<<<<<< HEAD
interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  size?: "default" | "large" | "small";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
=======
export interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  size?: "default" | "large" | "small" |"header";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  size = "default",
  disabled = false,
  className = "",
<<<<<<< HEAD
=======
  tabIndex,
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  onClick,
}) => {
  const styles = `${s.button} ${size && s[`button_${size}`]} ${className}`;

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
<<<<<<< HEAD
=======
      tabIndex={tabIndex}
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    >
      {label}
    </button>
  );
};

export default Button;
