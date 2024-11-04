// "use client";
import { FC } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('BookingForm');

  const handleIncrement = (type: GuestType) => {
    if (type === "adults" && adultsCount < 10) {
      setAdultsCount(adultsCount + 1);
    } else if (type === "children" && childrenCount < 10) {
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
        <h3 className={s.title}>{t('adults')}</h3>
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
        <h3 className={s.title}>{t('children')}</h3>
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
        {t('note1')}
      </p>
      <p className={s.childDescr}>
        {t('note2')}
      </p>
    </div>
  );
};

export default GuestsForm;
