"use client";
import { useState, FC, useRef, useEffect, FormEventHandler} from "react";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";

import Icon from "../ui/Icon/Icon";
import Button from "../ui/Button/Button";
import Calendar from "./components/Calendar/Calendar";
import GuestsForm from "./components/GuestsForm/GuestsForm";
import Modal from "./components/Modal/Modal";
import StubModal, { ModalHandle } from "../ui/Modal/Modal";
import Main from "./stub/Main";
import Success from "./stub/Success";
import Error from "./stub/Error";

import s from "./BookingComponent.module.scss";

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
type ChildrenType = {
  type: "cal" | "guests" | null,
  triggerRef?: HTMLDivElement | HTMLFieldSetElement | null
}

//temporary stub logic
export type OrderType = {
  startDate: string | undefined;
  endDate: string | undefined;
  guests: number;
  house: string | null
}

// export type BotResponseStateType = {
//   status: boolean;
//   message?: string
// }
const BookingComponent: FC = () => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);//small modal for datepicker and guests
  const [activeChild, setActiveChild] = useState<ChildrenType>({
    type: null,
    triggerRef: null
  });
  
  //datepicker
  const [checkInDate, setCheckInDate] = useState<Date | null>(initialState.today);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(initialState.tomorrow);
  
  //guests
  const [adultsCount, setAdultsCount] = useState<number>(initialState.adultsCount);
  const [childrenCount, setChildrenCount] = useState<number>(initialState.childrenCount);
  
  //getting house to book
  const searchParams = useSearchParams();
  
  //order for booking form
  const [order, setOrder] = useState<OrderType>({
    startDate: checkInDate?.toLocaleDateString("uk-UA"),
    endDate: checkOutDate?.toLocaleDateString("uk-UA"),
    guests: adultsCount + childrenCount,
    house: searchParams.get('house')
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLFieldSetElement | null>(null);

  
  //temporary stub logic -->
  
  //displaying modal overlay
  const [isStubModalOpen, setIsStubModalOpen] = useState<boolean>(false);
  
  const [botResponseState, setBotResponseState] = useState<boolean | null>(null);
  
  //states for displaying main form and success/error forms
  const [showMainForm, setShowMainForm] = useState<boolean>(true);
  const [showSuccessForm, setShowSuccessForm] = useState<boolean>(false);
  const [showErrorForm, setShowErrorForm] = useState<boolean>(false);
  
  //ref for adding animation to stub modal closing handler
  const refForAnimatedClose = useRef<ModalHandle | null>(null);

  //handlers for opening/closing stub modal
  const handleOpenStub = () => {
    setIsStubModalOpen(!isStubModalOpen);
  }
  const handleShowSuccess = () => {
    showMainForm && setShowMainForm(false);
    setShowSuccessForm(true);
    setBotResponseState(null);
  }
  const handleShowError = () => {
    showMainForm && setShowMainForm(false);
    setShowErrorForm(true);
    setBotResponseState(null);
  }

  //closing stub modal
  const handleCloseStub = () => {
    resetBooking();
    setIsStubModalOpen(false);
    setShowErrorForm(false);
    setShowSuccessForm(false);
    setShowMainForm(true);
  }

  //handler to return  to the main form when an error catched
  const backToMainForm = () => {
    setShowMainForm(true);
    setShowErrorForm(false);
  }
  
  //changing states of active forms and displaying forms logic
  useEffect(() => {
    if(!isStubModalOpen || botResponseState === null) return;
    botResponseState ? handleShowSuccess() : handleShowError();
    }, [botResponseState, isStubModalOpen]);
    
//<--end temporary stub logic

  

  //small modal for choosing dates and guests
  const toggleModal = (val: ChildrenType) => {

    //open modal and set children
    if(!isModalOpen) {
      setIsModalOpen(!isModalOpen);
      setActiveChild(val);
    }

    //close the modal and clear children
    if(isModalOpen && val.type === activeChild.type || isModalOpen && !val.type) {
      setIsModalOpen(!isModalOpen);
      setActiveChild({type: null, triggerRef: null});
    }

    //keep modal and change active child with animation
    else if(
      isModalOpen && 
      val.type && 
      ((activeChild.type === 'cal' && val.type !== activeChild.type) ||
      val.type !== activeChild.type)) {
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
  }

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

  //changing an order data
  useEffect(() => {
    setOrder({
      startDate: checkInDate?.toLocaleDateString("uk-UA"),
        endDate: checkOutDate?.toLocaleDateString("uk-UA"),
        guests: adultsCount + childrenCount,
        house: searchParams.get('house')
    }); 
  }, [checkInDate, checkOutDate, adultsCount, childrenCount, searchParams]);

  //close small modal by outside click or Esc key
  useEffect(() => {
    const handleEscExit = (e: KeyboardEvent) => {
      if(e.code === 'Escape' && isModalOpen) {
        toggleModal({type: null, triggerRef: null});
      }
    }
    const handleOutOfModalClick = (e: MouseEvent) => {
      if(!modalRef.current || !endRef.current || !startRef.current || !guestRef.current) return
      
      if(isModalOpen && !modalRef.current.contains(e.target as Node) && 
        !guestRef.current.contains(e.target as Node) &&
        !endRef.current.contains(e.target as Node) && 
        !startRef.current.contains(e.target as Node)
      ) {
        toggleModal({type: null, triggerRef: null});
      }
    }
    document.addEventListener('keydown', handleEscExit);
    document.addEventListener('click', handleOutOfModalClick);
    return () => {
      document.removeEventListener('keydown', handleEscExit);
      document.removeEventListener('click', handleOutOfModalClick);
    }
  },[toggleModal]);

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
    // new Promise((resolve, reject) =>  setTimeout(() => {
    //   console.log(data);
    //   resolve(null);
    // }, 2000)).finally(() => resetBooking());
    
  };

  const buildOpenButtonStyles = (curTarget: HTMLDivElement | null) => {
    if(isModalOpen && activeChild.type === 'cal') {
      return activeChild.triggerRef === curTarget ? s.upIcon : s.hideIcon
    } else return s.downIcon
  };

  return (
    <div className={s.bookingComponentContainer}>
      <form className={s.bookingForm} onSubmit={handleSearch}>
        <div
          ref={startRef}
          className={s.dateWrapper}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            toggleModal({
              type: "cal",
              triggerRef: startRef.current,
            });
          }}
        >
          <label htmlFor="start_date" className={s.dateLabel}>
            Заїзд
          </label>
          <input
            type="text"
            name="start_date"
            id="start_date"
            value={checkInDate ? checkInDate.toLocaleDateString("uk-UA") : ""}
            className={s.dateInput}
            readOnly
            tabIndex={-1}
          />
          <button
            type="button"
            className={`${s.dateOpenButton}`}
            aria-label="toggle calendar"
          >
            <Icon
              name="icon-down"
              className={buildOpenButtonStyles(startRef.current)}
            />
          </button>
        </div>

        <div
          ref={endRef}
          className={s.dateWrapper}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            toggleModal({
              type: "cal",
              triggerRef: endRef.current,
            });
          }}
        >
          <label htmlFor="end_date" className={s.dateLabel}>
            Виїзд
          </label>
          <input
            type="text"
            name="end_date"
            id="end_date"
            value={checkOutDate ? checkOutDate.toLocaleDateString("uk-UA") : ""}
            className={s.dateInput}
            readOnly
            tabIndex={-1}
          />
          <button
            type="button"
            className={`${s.dateOpenButton} `}
            aria-label="toggle calendar"
          >
            <Icon
              name="icon-down"
              className={buildOpenButtonStyles(endRef.current)}
            />
          </button>
        </div>

        <fieldset
          ref={guestRef}
          className={s.guestWrapper}
          name="guests"
          onClick={(e: React.MouseEvent<HTMLFieldSetElement>) => {
            e.preventDefault();
            toggleModal({
              type: "guests",
              triggerRef: guestRef.current,
            });
          }}
        >
          <p className={s.guestLegend}>
            <legend>Гості</legend>
          </p>
          <label htmlFor="adult_guests" className={s.guestsLabel}>
            Дорослі:
            <input
              className={s.guestsInput}
              type="text"
              name="adult_guests"
              id="adult_guests"
              value={adultsCount}
              readOnly
              tabIndex={-1}
            />
            ,
          </label>
          <label htmlFor="children_guests" className={s.guestsLabel}>
            Діти:
            <input
              className={s.guestsInput}
              type="text"
              name="children_guests"
              id="children_guests"
              value={childrenCount}
              readOnly
              tabIndex={-1}
            />
          </label>
          <button
            type="button"
            className={`${s.guestOpenButton} `}
            aria-label="toggle guests form"
          >
            <Icon
              name="icon-down"
              className={
                isModalOpen && activeChild.type === "guests"
                  ? s.upIcon
                  : s.downIcon
              }
            />
          </button>
        </fieldset>

        <div className={s.buttonSearch}>
          <Button
            label={`${searchParams.has("house") ? "Замовити" : "Шукати"}`}
            type="submit"
            disabled={!checkOutDate ? true : false}
            onClick={handleOpenStub}
          />
        </div>
      </form>
      <Modal visible={isModalOpen} ref={modalRef}>
        <div className="animation-wrapper">
          {activeChild.type === "cal" ? (
            <Calendar
              onDateSelect={handleDateSelect}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          ) : null}
          {activeChild.type === "guests" ? (
            <GuestsForm
              adultsCount={adultsCount}
              childrenCount={childrenCount}
              setAdultsCount={setAdultsCount}
              setChildrenCount={setChildrenCount}
            />
          ) : null}
        </div>
      </Modal>
      <StubModal 
        isOpen={isStubModalOpen} 
        onClose={handleCloseStub}
        wrapperStyles={{
          margin: 'auto',
        }}
        ref={refForAnimatedClose}
        inner={false}>
        <Main 
          isOpen={showMainForm} 
          order={order} 
          handleBotResponse={setBotResponseState}
          handleClose={refForAnimatedClose.current?.assignedClose}/>
        <Success isOpen={showSuccessForm} handleClose={refForAnimatedClose.current?.assignedClose} />
        <Error 
          isOpen={showErrorForm} 
          handleClose={refForAnimatedClose.current?.assignedClose} 
          handleRepeatFilling={backToMainForm} />
      </StubModal>
    </div>
  );
};

export default BookingComponent;
