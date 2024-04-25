"use client";

import Icon from "../ui/Icon/Icon";
import s from "./GuestsForm.module.scss";

interface GuestsProps {
  adults: number;
  children: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  onGuestsChange: (adults: number, children: number) => void;
}

const GuestsForm: React.FC<GuestsProps> = ({
  onGuestsChange,
  adults,
  children,
  setAdults,
  setChildren,
}) => {
  type GuestType = "adults" | "children";
  const handleIncrement = (type: GuestType) => {
    if (type === "adults") {
      setAdults(adults + 1);
      onGuestsChange(adults + 1, children); 
    } else if (type === "children") {
      setChildren(children + 1);
      onGuestsChange(adults, children + 1); 
    }
  };

  const handleDecrement = (type: GuestType) => {
    if (type === "adults" && adults > 0) {
      setAdults(adults - 1);
      onGuestsChange(adults - 1, children);
    } else if (type === "children" && children > 0) {
      setChildren(children - 1);
      onGuestsChange(adults, children - 1); 
    }
  };

  return (
    <div className={s.guestsFormContainer}>
      <div className={s.adultWrapper}>
        <h3 className={s.title}>Дорослі</h3>
        <div className={s.buttonWrapper}>
          <button
            className={s.minButton}
            type="button"
            onClick={() => handleDecrement("adults")}
          >
            <Icon className={s.minIcon} name="icon-min" />
          </button>
          <p className={s.value}>{adults}</p>
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleIncrement("adults")}
          >
            <Icon className={s.plusIcon} name="icon-plus" />
          </button>
        </div>
      </div>

      <div className={s.childWrapper}>
        <h3 className={s.title}>Діти</h3>
        <div className={s.buttonWrapper}>
          <button
            className={s.minButton}
            type="button"
            onClick={() => handleDecrement("children")}
          >
            <Icon className={s.minIcon} name="icon-min" />
          </button>
          <p className={s.value}>{children}</p>
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleIncrement("children")}
          >
            <Icon className={s.plusIcon} name="icon-plus" />
          </button>
        </div>
      </div>
      <p className={s.textFirst}>
        Діти до 3-х років без надання додаткового місця - не тарифікуються.
      </p>
      <p className={s.textSecond}>
        Діти віком від 3-х до 12-ти, з наданням окремого місця, тарифікуються за
        дитячим тарифом - 150 грн/ніч.{" "}
      </p>
    </div>
  );
};

export default GuestsForm;
