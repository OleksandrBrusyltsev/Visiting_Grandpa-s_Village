import { useState, ReactNode } from "react";
import styles from "./IconSocialNetwork.module.scss";

type IconState = "default" | "hover" | "click" | "disable";

interface IconProps {
  iconName: string;
  children?: ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
}

const IconSocialNetwork: React.FC<IconProps> = ({
  iconName,
  children,
  onClick,
  isDisabled,
}) => {
  const [iconState, setIconState] = useState<IconState>("default");

  const handleMouseEnter = () => !isDisabled && setIconState("hover");
  const handleMouseLeave = () => !isDisabled && setIconState("default");
  const handleMouseDown = () => !isDisabled && setIconState("click");
  const handleMouseUp = () => !isDisabled && setIconState("hover");

  const className = `${styles.icon} ${styles[`${iconName}-${iconState}`]}`;

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default IconSocialNetwork;
