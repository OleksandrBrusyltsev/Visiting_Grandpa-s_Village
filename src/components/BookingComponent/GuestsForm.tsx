"use client";
import Icon from "../ui/Icon/Icon";
import s from "./GuestsForm.module.scss";

const GuestsForm: React.FC = () => {
  return (
    <div className={s.guestsFormContainer}>
      <div className={s.adultWrapper}>
        <h3 className={s.title}>Дорослі</h3>
        <div className={s.buttonWrapper}>
          <button className={s.minButton} type="button">
            <Icon className={s.minIcon} name="icon-min" />
          </button>
          <p className={s.value}>2</p>
          <button className={s.plusButton} type="button">
            <Icon className={s.plusIcon} name="icon-plus" />
          </button>
        </div>
      </div>

      <div className={s.childWrapper}>
        <h3 className={s.title}>Діти</h3>
        <div className={s.buttonWrapper}>
          <button className={s.minButton} type="button">
            <Icon className={s.minIcon} name="icon-min" />
          </button>
          <p className={s.value}>2</p>
          <button className={s.plusButton} type="button">
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
