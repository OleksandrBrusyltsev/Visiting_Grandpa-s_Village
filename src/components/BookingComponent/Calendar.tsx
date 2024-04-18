"use client";

import { useState, useEffect } from "react";
import Icon from "../ui/Icon/Icon";
import s from "./Calendar.module.scss";

interface CalendarProps {
  onDateSelect: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months: string[] = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let startOffset = firstDayofMonth === 0 ? 6 : firstDayofMonth - 1;

    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let daysArray = [];

    for (let i = startOffset; i > 0; i--) {
      daysArray.push({
        day: lastDateofLastMonth - i + 1,
        class: "lastDaysItem",
      });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysArray.push({ day: i, class: "" });
    }

    if (lastDayofMonth !== 0) {
      for (let i = lastDayofMonth; i < 7; i++) {
        daysArray.push({ day: i - lastDayofMonth + 1, class: "nextDaysItem" });
      }
    }

    setDaysList(daysArray);
    setCurrentDateText(`${months[currMonth]} ${currYear}`);
  };

  useEffect(() => {
    renderCalendar();
  }, [currMonth, currYear]);

  const handlePrevNextClick = (direction: number) => {
    let newMonth = currMonth + direction;
    let newYear = currYear;

    if (newMonth < 0) {
      newMonth = 11; // Устанавливаем новый месяц на декабрь
      newYear--; // Уменьшаем текущий год на 1
    } else if (newMonth > 11) {
      newMonth = 0; // Устанавливаем новый месяц на январь
      newYear++; // Увеличиваем текущий год на 1
    }

    setCurrMonth(newMonth);
    setCurrYear(newYear);
    renderCalendar();
  };

  const [currentDateText, setCurrentDateText] = useState<string>("");

  interface DayInfo {
    day: number;
    class: string;
  }

  const [daysList, setDaysList] = useState<DayInfo[]>([]);

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currYear, currMonth, day);
    if (
      clickedDate.getFullYear() === currYear &&
      clickedDate.getMonth() === currMonth
    ) {
      setSelectedDate(clickedDate);
      onDateSelect(clickedDate);
      // Добавляем класс актив к выбранной дате
      const daysListCopy = [...daysList];
      const selectedDayIndex = daysList.findIndex(
        (item) => item.day === clickedDate.getDate()
      );
      if (selectedDayIndex !== -1) {
        daysListCopy[selectedDayIndex].class = "activeDay";
        setDaysList(daysListCopy);
      }
    }
  };

  return (
    <div className={s.calendarWrapper}>
      <header className={s.calendarHeader}>
        <p className={s.currentMonth}>{currentDateText}</p>
        <div className="icons">
          <button
            type="button"
            className={s.calendarPrevButton}
            onClick={() => handlePrevNextClick(-1)}
          >
            <Icon name="icon-prev" className={s.prevIcon} />
          </button>
          <button
            type="button"
            className={s.calendarNextButton}
            onClick={() => handlePrevNextClick(1)}
          >
            <Icon name="icon-next" className={s.nextIcon} />
          </button>
        </div>
      </header>
      <div className={s.daysWrapper}>
        <ul className={s.weeksList}>
          <li className={s.weeksItem}>Пн</li>
          <li className={s.weeksItem}>Вт</li>
          <li className={s.weeksItem}>Ср</li>
          <li className={s.weeksItem}>Чт</li>
          <li className={s.weeksItem}>Пт</li>
          <li className={s.weeksItem}>Сб</li>
          <li className={s.weeksItem}>Нд</li>
        </ul>
        <ul className={s.daysList}>
          {daysList.map((item, index) => (
            <li
              key={index}
              className={`${s.daysItem} ${s[item.class]}`}
              onClick={() => handleDayClick(item.day)}
            >
              {item.day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
