// "use client";
import { FC } from "react";

import s from "./GuestsForm.module.scss";

interface GuestsProps {
  adultsCount: number;
  childrenCount: number;
  setAdultsCount: React.Dispatch<React.SetStateAction<number>>;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
}

type GuestType = "adults" | "children";

const GuestsForm: FC<GuestsProps> = ({
  adultsCount,
  childrenCount,
  setAdultsCount,
  setChildrenCount,
}) => {

  const handleIncrement = (type: GuestType) => {
    if (type === "adults") {
      setAdultsCount(adultsCount + 1);
    } else if (type === "children") {
      setChildrenCount(childrenCount + 1);
    }
  };

  const handleDecrement = (type: GuestType) => {
    if (type === "adults" && adultsCount > 1) {
      setAdultsCount(adultsCount - 1);
    } else if (type === "children" && childrenCount > 0) {
      setChildrenCount(childrenCount - 1);
    }
  };

  return (
    <div className={s.guestsFormContainer}>
      <div className={s.adultWrapper}>
        <h3 className={s.title}>Дорослі</h3>
        <div className={s.buttonWrapper}>
          <button
            className={`${s.changeButton} ${adultsCount === 1 ? s.disabled : ''}`}
            type="button"
            onClick={() => handleDecrement("adults")}
          >
            -
          </button>
          <p className={s.value}>{adultsCount}</p>
          <button
            className={s.changeButton}
            type="button"
            onClick={() => handleIncrement("adults")}
          >
            +
          </button>
        </div>
      </div>

      <div className={s.childWrapper}>
        <h3 className={s.title}>Діти</h3>
        <div className={s.buttonWrapper}>
          <button
            className={`${s.changeButton} ${childrenCount === 0 ? s.disabled : ''}`}
            type="button"
            onClick={() => handleDecrement("children")}
          >
            -
          </button>
          <p className={s.value}>{childrenCount}</p>
          <button
            className={s.changeButton}
            type="button"
            onClick={() => handleIncrement("children")}
          >
           +
          </button>
        </div>
      </div>
      <p className={s.childDescr}>
        Діти до 3-х років без надання додаткового місця - не тарифікуються.
      </p>
      <p className={s.childDescr}>
        Діти віком від 3-х до 12-ти, з наданням окремого місця, тарифікуються за
        дитячим тарифом - 150 грн/ніч.{" "}
      </p>
    </div>
  );
};

export default GuestsForm;
