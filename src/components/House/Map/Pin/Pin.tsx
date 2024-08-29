import { FC } from "react";
import Image from "next/image";
import PinProps from "../../../../types/pin";
import styles from "./Pin.module.scss";

const Pin: FC<PinProps> = ({
  top,
  left,
  topSmall,
  leftSmall,
  topSmallDifference,
  leftSmallDifference,
  topMedium,
  leftMedium,
  topMediumDifference,
  leftMediumDifference,
  topLarge,
  leftLarge,
}) => {
  return (
    <div
      className={styles.pin}
      style={
        {
          "--top": `${top}px`,
          "--left": `${left}px`,
          "--top-small": `${topSmall}px`,
          "--left-small": `${leftSmall}px`,
          "--top-small-difference": `${topSmallDifference}`,
          "--left-small-difference": `${leftSmallDifference}`,
          "--top-medium": `${topMedium}px`,
          "--left-medium": `${leftMedium}px`,
          "--top-medium-difference": `${topMediumDifference}`,
          "--left-medium-difference": `${leftMediumDifference}`,
          "--top-large": `${topLarge}px`,
          "--left-large": `${leftLarge}px`,
        } as React.CSSProperties
      }
    >
      <Image
        fill
        alt=""
        src="/images/houses/house/Shape.png"
        sizes="17px, 24px"
      />
    </div>
  );
};

export default Pin;
