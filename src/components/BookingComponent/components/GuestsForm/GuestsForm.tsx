<<<<<<< HEAD
"use client";
import { FC } from "react";
import Image from "next/image";
import IconPlus from "../../../../assets/icons/icon-plus.svg";
import IconMin from "../../../../assets/icons/icon-min.svg";
=======
// "use client";
import { FC } from "react";

>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
import s from "./GuestsForm.module.scss";

interface GuestsProps {
  adultsCount: number;
  childrenCount: number;
  setAdultsCount: React.Dispatch<React.SetStateAction<number>>;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
<<<<<<< HEAD
  onGuestsChange: (adults: number, children: number) => void;
}

const GuestsForm: FC<GuestsProps> = ({
  onGuestsChange,
=======
}

type GuestType = "adults" | "children";

const GuestsForm: FC<GuestsProps> = ({
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  adultsCount,
  childrenCount,
  setAdultsCount,
  setChildrenCount,
}) => {
<<<<<<< HEAD
  type GuestType = "adults" | "children";
  const handleIncrement = (type: GuestType) => {
    if (type === "adults") {
      setAdultsCount(adultsCount + 1);
      onGuestsChange(adultsCount + 1, childrenCount);
    } else if (type === "children") {
      setChildrenCount(childrenCount + 1);
      onGuestsChange(adultsCount, childrenCount + 1);
=======

  const handleIncrement = (type: GuestType) => {
    if (type === "adults" && adultsCount < 10) {
      setAdultsCount(adultsCount + 1);
    } else if (type === "children" && childrenCount < 10) {
      setChildrenCount(childrenCount + 1);
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    }
  };

  const handleDecrement = (type: GuestType) => {
<<<<<<< HEAD
    if (type === "adults" && adultsCount > 0) {
      setAdultsCount(adultsCount - 1);
      onGuestsChange(adultsCount - 1, childrenCount);
    } else if (type === "children" && childrenCount > 0) {
      setChildrenCount(childrenCount - 1);
      onGuestsChange(adultsCount, childrenCount - 1);
=======
    if (type === "adults" && adultsCount > 1) {
      setAdultsCount(adultsCount - 1);
    } else if (type === "children" && childrenCount > 0) {
      setChildrenCount(childrenCount - 1);
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    }
  };

  return (
    <div className={s.guestsFormContainer}>
      <div className={s.adultWrapper}>
        <h3 className={s.title}>Дорослі</h3>
        <div className={s.buttonWrapper}>
          <button
<<<<<<< HEAD
            className={s.minButton}
            type="button"
            onClick={() => handleDecrement("adults")}
          >
            <Image src={IconMin} alt="minus" className={s.minIcon} />
          </button>
          <p className={s.value}>{adultsCount}</p>
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleIncrement("adults")}
          >
            <Image src={IconPlus} alt="plus" className={s.plusIcon} />
=======
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
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
          </button>
        </div>
      </div>

      <div className={s.childWrapper}>
        <h3 className={s.title}>Діти</h3>
        <div className={s.buttonWrapper}>
          <button
<<<<<<< HEAD
            className={s.minButton}
            type="button"
            onClick={() => handleDecrement("children")}
          >
            <Image src={IconMin} alt="minus" className={s.minIcon} />
          </button>
          <p className={s.value}>{childrenCount}</p>
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleIncrement("children")}
          >
            <Image src={IconPlus} alt="plus" className={s.plusIcon} />
          </button>
        </div>
      </div>
      <p className={s.textFirst}>
        Діти до 3-х років без надання додаткового місця - не тарифікуються.
      </p>
      <p className={s.textSecond}>
=======
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
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
        Діти віком від 3-х до 12-ти, з наданням окремого місця, тарифікуються за
        дитячим тарифом - 150 грн/ніч.{" "}
      </p>
    </div>
  );
};

export default GuestsForm;
