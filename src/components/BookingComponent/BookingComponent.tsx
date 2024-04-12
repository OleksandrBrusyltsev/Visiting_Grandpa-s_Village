"use client";

import { useState } from "react";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import s from "./BookingComponent.module.scss";

const BookingComponent: React.FC = () => {
  const [date, setDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <form className={s.bookingForm}>
      <div className={s.labelWraper}>
        <label className={s.bookingLabel}>Заїзд</label>
        <div className={s.inputWrapper}>
          <input
            type="text"
            value={date}
            onChange={handleDateChange}
            placeholder="Выберите дату"
            className={s.bookingInput}
          />
          <button
            type="button"
            className={s.bookingOpenButton}
            onClick={() => console.log("Календарь открыт")}
          >
            <Icon name="icon-down" className={s.downIcon} />
          </button>
        </div>
      </div>
      <div className={s.labelWraper}>
        <label className={s.bookingLabel}>Виїзд</label>
        <div className={s.inputWrapper}>
          <input
            type="text"
            value={date}
            onChange={handleDateChange}
            placeholder="Выберите дату"
            className={s.bookingInput}
          />
          <button
            className={s.bookingOpenButton}
            onClick={() => console.log("Календарь открыт")}
          >
            <Icon name="icon-down" className={s.downIcon} />
          </button>
        </div>
      </div>

      <div className={s.labelWraper}>
        <label className={s.bookingLabel}>Гості</label>
        <div className={s.inputWrapper}>
          <input
            className={s.bookingInput}
            type="text"
            value={date}
                      onChange={handleDateChange}
                      placeholder = "Дорослі: 2, Діти: 0"
          />
          <button
            className={s.bookingOpenButton}
            onClick={() => console.log("Календарь открыт")}
          >
            <Icon name="icon-down" className={s.downIcon} />
          </button>
        </div>
      </div>

      <Button
        size="default"
              label="Шукати"
              type="submit"
        className={`${s.button} ${s.buttonSearch}`}
      />
    </form>
  );
};

export default BookingComponent;
