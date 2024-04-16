"use client";

import { useState, useEffect } from "react";
import Icon from "../ui/Icon/Icon";
import s from "./Calendar.module.scss";

const Calendar: React.FC = () => {
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState<number>(new Date().getMonth());

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
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // получаем день недели для первого числа месяца
    let startOffset = firstDayofMonth === 0 ? 6 : firstDayofMonth - 1; // вычисляем смещение от воскресенья до понедельника (0 -> 6, 1 -> 0, ..., 6 -> 5)

    // Сдвигаем первый день месяца на понедельник, если он не приходится на понедельник
    let firstMondayOfMonth = new Date(currYear, currMonth, 1 - startOffset);

    // Теперь firstMondayOfMonth будет содержать дату, которая соответствует понедельнику первой недели месяца

    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // получаем последнее число месяца
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay(); // получаем последний день недели месяца
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // получаем последнее число предыдущего месяца

    let daysArray = [];

    for (let i = startOffset; i > 0; i--) {
      // создаем li для последних дней предыдущего месяца
      daysArray.push(lastDateofLastMonth - i + 1);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      // создаем li для всех дней текущего месяца
      daysArray.push(i);
    }

    if (lastDayofMonth !== 0) {
      for (let i = lastDayofMonth; i < 7; i++) {
        // создаем li для первых дней следующего месяца
        daysArray.push(i - lastDayofMonth + 1);
      }
    }

    setCurrentDateText(`${months[currMonth]} ${currYear}`); // устанавливаем текущий месяц и год как текст заголовка
    setDaysList(daysArray); // устанавливаем сгенерированный HTML для дней месяца
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
    console.log("Current month:", currMonth);
    console.log("New month:", newMonth, "New year:", newYear);

    setCurrMonth(newMonth);
    setCurrYear(newYear);
    renderCalendar();
  };

  const [currentDateText, setCurrentDateText] = useState<string>("");

  const [daysList, setDaysList] = useState<number[]>([]);
  console.log(daysList);

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
            <li key={index} className={s.daysItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
