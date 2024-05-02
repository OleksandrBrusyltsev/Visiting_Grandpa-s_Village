"use client";
import Image from "next/image";
import IconPlus from "../../../../assets/icons/icon-plus.svg";
import IconMin from "../../../../assets/icons/icon-min.svg";
import s from "./GuestsForm.module.scss";

interface GuestsProps {
  adultsCount: number;
  childrenCount: number;
  setAdultsCount: React.Dispatch<React.SetStateAction<number>>;
  setChildrenCount: React.Dispatch<React.SetStateAction<number>>;
  onGuestsChange: (adults: number, children: number) => void;
}

const GuestsForm: React.FC<GuestsProps> = ({
  onGuestsChange,
  adultsCount,
  childrenCount,
  setAdultsCount,
  setChildrenCount,
}) => {
  type GuestType = "adults" | "children";
  const handleIncrement = (type: GuestType) => {
    if (type === "adults") {
      setAdultsCount(adultsCount + 1);
      onGuestsChange(adultsCount + 1, childrenCount);
    } else if (type === "children") {
      setChildrenCount(childrenCount + 1);
      onGuestsChange(adultsCount, childrenCount + 1);
    }
  };

  const handleDecrement = (type: GuestType) => {
    if (type === "adults" && adultsCount > 0) {
      setAdultsCount(adultsCount - 1);
      onGuestsChange(adultsCount - 1, childrenCount);
    } else if (type === "children" && childrenCount > 0) {
      setChildrenCount(childrenCount - 1);
      onGuestsChange(adultsCount, childrenCount - 1);
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
            <Image src={IconMin} alt="minus" className={s.minIcon} />
          </button>
          <p className={s.value}>{adultsCount}</p>
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleIncrement("adults")}
          >
            <Image src={IconPlus} alt="plus" className={s.plusIcon} />
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
        Діти віком від 3-х до 12-ти, з наданням окремого місця, тарифікуються за
        дитячим тарифом - 150 грн/ніч.{" "}
      </p>
    </div>
  );
};

export default GuestsForm;
