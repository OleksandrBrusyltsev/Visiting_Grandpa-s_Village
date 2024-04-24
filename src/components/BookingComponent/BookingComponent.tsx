"use client";

import { useState } from "react";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./Calendar";
import GuestsForm from "./GuestsForm";
import s from "./BookingComponent.module.scss";

const BookingComponent: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isGuestsFormOpen, setIsGuestsFormOpen] = useState<boolean>(false);
  const [selectionStage, setSelectionStage] = useState<
    "checkIn" | "checkOut" | "reset"
    >("checkIn");
  
   const [adults, setAdults] = useState(0);
   const [children, setChildren] = useState(0);

  console.log(adults);
  console.log(children);
  const handleGuestsChange = (adults: number, children:number) => {
    setAdults(adults);
    setChildren(children);
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      switch (selectionStage) {
        case "checkIn":
          setCheckInDate(date);
          setSelectionStage("checkOut");
          break;
        case "checkOut":
          if (date < checkInDate!) {
            setCheckInDate(date);
            setCheckOutDate(null);
          } else {
            setCheckOutDate(date);
            setSelectionStage("reset");
          }

          break;
        case "reset":
          setCheckInDate(date);
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
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const toggleCalendar = () => {
    if (isGuestsFormOpen) {
      setIsGuestsFormOpen(false);
    }
    setIsCalendarOpen(!isCalendarOpen);
  };

  const toggleGuestsForm = () => {
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
    }
    setIsGuestsFormOpen(!isGuestsFormOpen);
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
            <input className={s.bookingInputGuests} type="text" />
            <button
              type="button"
              className={s.bookingOpenButton}
              onClick={toggleGuestsForm}
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
          onClick={handleSearch}
        />
      </form>
      {isCalendarOpen && (
        <Calendar
          onDateSelect={handleDateSelect}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      )}
      {isGuestsFormOpen && (
        <GuestsForm onGuestsChange={handleGuestsChange} adults={adults} children ={children} setAdults ={setAdults} setChildren = {setChildren} />
      )}
    </>
  );
};

export default BookingComponent;
