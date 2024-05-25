"use client";
import { useState, useEffect, FC } from "react";
import Image from "next/image";

import IconPrev from "../../../../assets/icons/icon-prev.svg";
import IconNext from "../../../../assets/icons/icon-next.svg";

import s from "./Calendar.module.scss";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

interface DayInfo {
  day: number;
  class: string;
  month: number;
}

const getClassNames = (
  classNames: string,
  styles: Record<string, string>
) => {
  return classNames
    .split(" ")
    .map((className) => styles[className])
    .join(" ");
};

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

const Calendar: FC<CalendarProps> = ({
  onDateSelect,
  checkInDate,
  checkOutDate,
}) => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());

  const [daysList, setDaysList] = useState<DayInfo[]>([]);

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
        month: currMonth - 1,
      });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysArray.push({ day: i, class: "", month: currMonth });
    }

    if (lastDayofMonth !== 0) {
      for (let i = lastDayofMonth; i < 7; i++) {
        daysArray.push({
          day: i - lastDayofMonth + 1,
          class: "nextDaysItem",
          month: currMonth + 1,
        });
      }
    }
    return daysArray
  };

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

  const handleDayClick = (day: number, month: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const clickedDate = new Date(currYear, month, day);
    clickedDate.setHours(0, 0, 0, 0);
    if (clickedDate >= today) {
      onDateSelect(clickedDate);
    }
  };

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const baseDaysList = renderCalendar();

    const daysListWithActiveClass = baseDaysList.map((item) => {
      const date = new Date(currYear, item.month, item.day);
      date.setHours(0, 0, 0, 0);
      let classes = [item.class];
  
      // Добавить класс для отключенной даты
      if (date.getTime() < today.getTime()) {
        classes.push("disabled");
      }
  
      // Если это день заезда, добавляем класс "activeDay"
      if (checkInDate && date.getTime() == checkInDate.getTime()) {
        classes.push("checkInDate");
      }
  
      // Если это день выезда, добавляем класс "activeDay"
      if (checkOutDate && date.getTime() == checkOutDate.getTime()) {
        classes.push("checkOutDate");
      }
  
      // Если это день между заездом и выездом, добавляем класс "activePeriod"
      if (
        checkInDate &&
        checkOutDate &&
        date.getTime() >= checkInDate.getTime() &&
        date.getTime() <= checkOutDate.getTime()
      ) {
        classes.push("activePeriod");
      }
  
      return {
        ...item,
        class: classes.join(" "),
      };
    });
    setDaysList(daysListWithActiveClass);
  }, [checkInDate, checkOutDate, currMonth, currYear, renderCalendar]);
  
  return (
    <div className={s.calendarWrapper}>
      <header className={s.calendarHeader}>
        <p className={s.currentMonth}>{`${months[currMonth]} ${currYear}`}</p>
        <div className="icons">
          <button
            type="button"
            className={s.calendarPrevButton}
            onClick={() => handlePrevNextClick(-1)}
          >
            <Image src={IconPrev} alt = "icon-prev"className={s.prevIcon} />
          </button>
          <button
            type="button"
            className={s.calendarNextButton}
            onClick={() => handlePrevNextClick(1)}
          >
            <Image src={IconNext} alt="icon-next" className={s.nextIcon} />
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
          {daysList.length && daysList.map((item, index) => {
            const classNames = getClassNames(item.class, s);
            return (
              <li
                key={index}
                className={`${s.daysItem} ${classNames}`}
                onClick={() => handleDayClick(item.day, item.month)}
              >
                <div>{item.day}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
