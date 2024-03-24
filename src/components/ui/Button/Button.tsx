import s from './Button.module.scss';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'default' | 'large' | 'small';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  size = 'default',
  disabled = false,
  className = '',
  onClick,
}) => {
  const styles = `${s.button} ${size && s[`button_${size}`]} ${className}`;

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
