"use client";
import { FC, ReactNode } from "react";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import s from "./Modal.module.scss";


interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  type: "calendar" | "guestsForm";
}

const Modal: FC<ModalProps> = ({ isOpen, children, type }) => {
  useLayoutEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        `.${s.modal}`,
        {
          opacity: 0,
          duration: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);
  return (
    <div className={s.modal}>
      {type === "calendar" && <div className={s.calendar}>{children}</div>}
      {type === "guestsForm" && <div className={s.guestsForm}>{children}</div>}
    </div>
  );
};

export default Modal;
