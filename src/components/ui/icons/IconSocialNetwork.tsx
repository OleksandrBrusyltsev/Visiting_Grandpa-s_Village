import { useState } from "react";
import styles from "./IconSocialNetwork.module.scss";

type IconState = "default" | "hover" | "click" | "disable";

interface IconProps {
  iconName: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const IconSocialNetwork: React.FC<IconProps> = ({
  iconName,
  onClick,
  isDisabled,
}) => {
  const [iconState, setIconState] = useState<IconState>("default");

  const handleMouseEnter = () => setIconState("hover");
  const handleMouseLeave = () => setIconState("default");
  const handleMouseDown = () => setIconState("click");
  const handleMouseUp = () => setIconState("hover");

  const className = `${styles.icon} ${styles[`${iconName}-${iconState}`]}`;

  return (
    <div
      className={className}
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={!isDisabled ? handleMouseEnter : undefined}
      onMouseLeave={!isDisabled ? handleMouseLeave : undefined}
      onMouseDown={!isDisabled ? handleMouseDown : undefined}
      onMouseUp={!isDisabled ? handleMouseUp : undefined}
    />
  );
};

export default IconSocialNetwork;
