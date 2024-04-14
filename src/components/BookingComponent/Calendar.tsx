"use client";

import { useState, useEffect } from "react";
import Icon from "../ui/Icon/Icon";
import s from "./Calendar.module.scss";

const Calendar: React.FC = () => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());
  const [date] = useState<Date>(new Date());

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay(); // getting last day of month
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 1; i--) {
      // creating li of previous month last days
      liTag += `<li class=${s.daysItem}>${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      // создаем элементы списка для всех дней текущего месяца и применяем класс daysItem
      liTag += `<li class=${s.daysItem}>${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 7; i++) {
      // creating li of next month first days
      liTag += `<li class=${s.daysItem}>${i - lastDayofMonth + 1}</li>`;
    }
    setCurrentDateText(`${months[currMonth]} ${currYear}`); // passing current mon and yr as currentDate text
    setDaysList(liTag);
  };

  useEffect(() => {
    renderCalendar();
  }, []);

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
  const [daysList, setDaysList] = useState<string>("");

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
          <li className={s.weeksItem}>Mon</li>
          <li className={s.weeksItem}>Tue</li>
          <li className={s.weeksItem}>Wed</li>
          <li className={s.weeksItem}>Thu</li>
          <li className={s.weeksItem}>Fri</li>
          <li className={s.weeksItem}>Sat</li>
          <li className={s.weeksItem}>Sun</li>
        </ul>
        <ul
          className={s.daysList}
          dangerouslySetInnerHTML={{ __html: daysList }}
        ></ul>
      </div>
    </div>
  );
};

export default Calendar;
