"use client";
import { useState, FC, useRef, useEffect, FormEventHandler} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./components/Calendar/Calendar";
import GuestsForm from "./components/GuestsForm/GuestsForm";
import Modal from "./components/Modal/Modal";

import s from "./BookingComponent.module.scss";

gsap.registerPlugin(useGSAP);      

const todayReset = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today
}

const tomorrowReset = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

const initialState = {
  today: todayReset,
  tomorrow: tomorrowReset,
  adultsCount: 1,
  childrenCount: 0
};
type ChildrenType = "guests" | "cal" | null
const BookingComponent: FC = () => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeChild, setActiveChild] = useState<ChildrenType>(null);
  
  const [checkInDate, setCheckInDate] = useState<Date | null>(initialState.today);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(initialState.tomorrow);

  const [adultsCount, setAdultsCount] = useState<number>(initialState.adultsCount);
  const [childrenCount, setChildrenCount] = useState<number>(initialState.childrenCount);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLFieldSetElement | null>(null);

  const {contextSafe} = useGSAP();

  const toggleModal = contextSafe((val: ChildrenType) => {
    //open modal and set children
    if(!isModalOpen) {
      setIsModalOpen(!isModalOpen);
      setActiveChild(val);
      gsap.fromTo(modalRef.current,
        {scale: 0.8},
        {
          autoAlpha: 1,
          scale: 1,
          ease: "power2.out"
        }
      )
    }

    //close the modal and clear children
    if(isModalOpen && val === activeChild || isModalOpen && !val) {
      gsap.to(modalRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setIsModalOpen(!isModalOpen);
          setActiveChild(null);
        }
      })
    }

    //keep modal and change active child with animation
    if(isModalOpen && val && val !== activeChild) {
      gsap.timeline({defaults: {duration: 0.3, ease: "power2.out"}})
      .to(".animation-wrapper", {
        autoAlpha: 0,
        onComplete: () => setActiveChild(val)
      })
      .to(".animation-wrapper",
        {
          autoAlpha: 1,
          scale: 1
        }
      )
    }
  });
  
  const handleDateSelect = (date: Date) => {
    if (checkInDate && checkOutDate) {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
    if (checkInDate && !checkOutDate && date > checkInDate!) {
      setCheckOutDate(date);
    } else if (checkInDate && !checkOutDate && date < checkInDate!) {
      setCheckInDate(date);
    }
  };
  
  //close modal by outside click or Esc key
  useEffect(() => {
    const handleEscExit = (e: KeyboardEvent) => {
      if(e.code === 'Escape' && isModalOpen) {
        toggleModal(null);
      }
    }
    const handleOutOfModalClick = (e: MouseEvent) => {
      if(!modalRef.current || !endRef.current || !startRef.current || !guestRef.current) return
      
      if(isModalOpen && !modalRef.current.contains(e.target as Node) && 
          (
            (activeChild === 'cal' && !guestRef.current.contains(e.target as Node)) ||
            (activeChild === 'guests' && !endRef.current.contains(e.target as Node) && 
              !startRef.current.contains(e.target as Node))
          )
        ) {
        toggleModal(null);
      }
    }
    document.addEventListener('keydown', handleEscExit);
    document.addEventListener('click', handleOutOfModalClick);
    return () => {
      document.removeEventListener('keydown', handleEscExit);
      document.removeEventListener('click', handleOutOfModalClick);
    }
  },[isModalOpen, toggleModal]);

  const resetBooking = () => {
    setAdultsCount(initialState.adultsCount);
    setChildrenCount(initialState.childrenCount);
    setCheckInDate(initialState.today);
    setCheckOutDate(initialState.tomorrow);
  };

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    // Обработка поиска
    new Promise((resolve, reject) =>  setTimeout(() => {
      console.log(data);
      resolve(null);
    }, 2000)).finally(() => resetBooking());
    
  };

  return (
    <div className={s.bookingComponentContainer}>
      <form className={s.bookingForm} onSubmit={handleSearch}>
        <div
          ref={startRef}
          className={s.dateWrapper}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            toggleModal('cal');
          }}
        >
          <label 
            htmlFor='start_date'
            className={s.dateLabel} >Заїзд</label>
          <input
            type="text"
            name='start_date'
            id='start_date'
            value={checkInDate ? checkInDate.toLocaleDateString('uk-UA') : ""}
            className={s.dateInput}
            readOnly
          />
          <button type="button" className={s.bookingOpenButton}>
            <Icon name="icon-down" className={s.downIcon} />
          </button>
        </div>
        
        <div
          ref={endRef}
          className={s.dateWrapper}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            toggleModal('cal');
          }}
        >
          <label 
            htmlFor='end_date'
            className={s.dateLabel}>Виїзд</label>
          <input
            type="text"
            name='end_date'
            id='end_date'
            value={checkOutDate ? checkOutDate.toLocaleDateString('uk-UA') : ""}
            className={s.dateInput}
            readOnly
          />
          <button type="button" className={s.bookingOpenButton}>
            <Icon name="icon-down" className={s.downIcon} />
          </button>
        </div>

        <fieldset
          ref={guestRef}
          className={s.guestWrapper}
          name='guests'
          onClick={(e: React.MouseEvent<HTMLFieldSetElement>) => {
            e.preventDefault();
            toggleModal('guests');
          }}
        >
          <p className={s.guestLegend}><legend >Гості</legend></p>
          <label htmlFor='adult_guests' className={s.adultLabel} >Дорослі: 
            <input
              className={s.bookingInput}
              type="text"
              name='adult_guests'
              id='adult_guests'
              value={adultsCount}
              readOnly
            />,
          </label>
          <label htmlFor='children_guests' className={s.childLabel} >Діти: 
            <input
              className={s.bookingInput}
              type="text"
              name='children_guests'
              id='children_guests'
              value={childrenCount}
              readOnly
            />
          </label>
        </fieldset>

        <div className={s.buttonSearch}>
          <Button
            size="small"
            label="Шукати"
            type="submit"
          />
        </div>
      </form>
      <Modal ref={modalRef}>
        <div className="animation-wrapper">
          {activeChild === 'cal' && <Calendar
            onDateSelect={handleDateSelect}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />} 
          {activeChild === 'guests' &&
          <GuestsForm
            adultsCount={adultsCount}
            childrenCount={childrenCount}
            setAdultsCount={setAdultsCount}
            setChildrenCount={setChildrenCount}
          />}
        </div>
      </Modal>
    </div>
  );
};

export default BookingComponent;
