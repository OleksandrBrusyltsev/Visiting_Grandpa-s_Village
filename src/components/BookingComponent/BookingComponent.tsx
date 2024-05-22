"use client";
import { useState, FC } from "react";
import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./components/Calendar/Calendar";
import GuestsForm from "./components/GuestsForm/GuestsForm";
import Modal from "./components/Modal/Modal";
import s from "./BookingComponent.module.scss";

const BookingComponent: FC = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState<Date | null>(today);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(tomorrow);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isGuestsFormOpen, setIsGuestsFormOpen] = useState<boolean>(false);
  const [selectionStage, setSelectionStage] = useState<
    "checkIn" | "checkOut" | "reset"
  >("checkIn");

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      switch (selectionStage) {
        case "checkIn":
          setCheckInDate(date);
          setCheckOutDate(null);
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
    setIsCalendarOpen(!isCalendarOpen);
    setIsGuestsFormOpen(false);
  };

  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleGuestsChange = (adults: number, children: number) => {
    setAdultsCount(adults);
    setChildrenCount(children);
  };

  const toggleGuestsForm = () => {
    setIsGuestsFormOpen(!isGuestsFormOpen);
    setIsCalendarOpen(false);
  };

  const handleSearch = () => {
    // Обработка поиска
  };

  return (
    <div className={s.bookingComponentContainer}>
      <form className={s.bookingForm} onSubmit={handleSearch}>
        <div
          className={`${s.labelWraper} ${s.labelWrapperCalendar}`}
          onClick={toggleCalendar}
        >
          <label className={s.bookingLabel}>Заїзд</label>
          <div className={s.inputWrapper}>
            <input
              type="text"
              value={checkInDate ? formatDate(checkInDate) : ""}
              className={s.bookingInput}
              readOnly
            />
            <button type="button" className={s.bookingOpenButton}>
              <Icon name="icon-down" className={s.downIcon} />
            </button>
          </div>
        </div>
        <div
          className={`${s.labelWraper} ${s.labelWrapperCalendar}`}
          onClick={toggleCalendar}
        >
          <label className={s.bookingLabel}>Виїзд</label>
          <div className={s.inputWrapper}>
            <input
              type="text"
              value={checkOutDate ? formatDate(checkOutDate) : ""}
              className={s.bookingInput}
              readOnly
            />
            <button type="button" className={s.bookingOpenButton}>
              <Icon name="icon-down" className={s.downIcon} />
            </button>
          </div>
        </div>

        <div
          className={`${s.labelWraper} ${s.labelWrapperGuests}`}
          onClick={toggleGuestsForm}
        >
          <label className={s.bookingLabel}>Гості</label>
          <div className={s.inputWrapper}>
            <input
              className={s.bookingInputGuests}
              type="text"
              value={`Дорослі: ${adultsCount.toString()}, Діти: ${childrenCount.toString()}`}
              readOnly
            />
          </div>
        </div>

        <Button
          size="default"
          label="Шукати"
          type="submit"
          className={`${s.button} ${s.buttonSearch}`}
        />
      </form>
      {isCalendarOpen && (
        <Modal isOpen={isCalendarOpen} type="calendar">
          <Calendar
            onDateSelect={handleDateSelect}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        </Modal>
      )}
      {isGuestsFormOpen && (
        <Modal isOpen={isGuestsFormOpen} type="guestsForm">
          <GuestsForm
            onGuestsChange={handleGuestsChange}
            adultsCount={adultsCount}
            childrenCount={childrenCount}
            setAdultsCount={setAdultsCount}
            setChildrenCount={setChildrenCount}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookingComponent;
