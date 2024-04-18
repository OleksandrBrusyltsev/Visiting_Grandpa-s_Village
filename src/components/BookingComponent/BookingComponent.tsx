"use client";

import { useState } from "react";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./Calendar";
import s from "./BookingComponent.module.scss";

const BookingComponent: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectionStage, setSelectionStage] = useState<
    "checkIn" | "checkOut" | "reset"
  >("checkIn");

  const handleDateSelect = (date: Date | null) => {
  setSelectedDate(date);
  if (date) {
    switch (selectionStage) {
      case "checkIn":
        console.log("Selected Check-In Date:", date);
        console.log("Current Check-Out Date:", checkOutDate);
        setCheckInDate(date);
        setSelectionStage("checkOut");
        break;
      case "checkOut":
        console.log("Selected Check-Out Date:", date);
        console.log("Current Check-In Date:", checkInDate);
        if (date < checkInDate!) {
          console.log("Check-Out Date is before Check-In Date.");
          console.log("Updating Check-In Date.");
          setCheckInDate (date);
          setCheckOutDate(null);
        } else {
          console.log("Check-Out Date is after or equal to Check-In Date.");
          setCheckOutDate(date);
          setSelectionStage("reset");
        }
        
        break;
      case "reset":
        console.log("Selected Check-In Date (Reset):", date);
        setCheckInDate (date);
        setCheckOutDate(null);
        setSelectionStage("checkOut");
        break;
      default:
        break;
    }
  }
};

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
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
              value={checkInDate ? formatDate(checkInDate) : ""}
              placeholder="Выберите дату"
              className={s.bookingInput}
              readOnly
            />
            <button
              type="button"
              className={s.bookingOpenButton}
              onClick={toggleCalendar}
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
              value={checkOutDate ? formatDate(checkOutDate) : ""}
              placeholder="Выберите дату"
              className={s.bookingInput}
              readOnly
            />
            <button
              type="button"
              className={s.bookingOpenButton}
              onClick={toggleCalendar}
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
      {isCalendarOpen && <Calendar onDateSelect={handleDateSelect} />}
    </>
  );
};

export default BookingComponent;
