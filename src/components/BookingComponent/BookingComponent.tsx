"use client";

import { useState } from "react";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./Calendar";
import s from "./BookingComponent.module.scss";

const BookingComponent: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [isCalendarСheckIn, setIsCalendarСheckIn] = useState<boolean>(false);
  //const [isCalendarCheckOut, setIsCalendarCheckOut] = useState<boolean>(false);
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// Функция для обновления выбранной даты
const handleDateSelect = (date: Date | null) => {
  setSelectedDate(date);
};
 
  const toggleCalendarСheckIn = () => {
    setIsCalendarСheckIn(!isCalendarСheckIn);
  };

  // const toggleCalendarCheckOut = () => {
  //   setTimeout(() => {
  //     console.log("Toggle Calendar CheckOut", isCalendarCheckOut); // Добавляем логирование
  //   }, 0);
  //   setIsCalendarCheckOut(!isCalendarCheckOut);
  // };

  

  const handleCheckInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckOutDate(event.target.value);
  };

  const handleSearch = () => {
    // Обработка поиска
  };

  return (
    <>
      <form className={s.bookingForm}>
        <div className={s.labelWraper}>
          <label className={s.bookingLabel}>Заїзд</label>
          <div className={s.inputWrapper}>
            <input
              type="text"
              value={checkInDate}
              onChange={handleCheckInDateChange}
              placeholder="Выберите дату"
              className={s.bookingInput}
            />
            <button
              type="button"
              className={s.bookingOpenButton}
              onClick={toggleCalendarСheckIn}
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
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
              placeholder="Выберите дату"
              className={s.bookingInput}
            />
            <button
              type="button"
              className={s.bookingOpenButton}
              onClick={toggleCalendarСheckIn}
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
              placeholder="Дорослі: 2, Діти: 0"
            />
          </div>
        </div>

        <Button
          size="default"
          label="Шукати"
          type="submit"
          className={`${s.button} ${s.buttonSearch}`}
          onClick={handleSearch}
        />
      </form>
      {isCalendarСheckIn && <Calendar onDateSelect={handleDateSelect} />}
    </>
  );
};

export default BookingComponent;
