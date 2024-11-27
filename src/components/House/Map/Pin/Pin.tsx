import { FC } from "react";
import Image from "next/image";
import PinProps from "../../../../types/pin";
import styles from "./Pin.module.scss";

const Pin: FC<PinProps> = ({
  bottom,
  left,
}) => {
  return (
    <div
      className={styles.pin}
      style={
        {
          "--bottom": `${bottom}%`,
          "--left": `${left}%`
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
