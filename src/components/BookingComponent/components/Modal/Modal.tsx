"use client";
import { forwardRef, ReactNode } from "react";
import s from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ children}, ref) {
  return (
    <div className={s.modal} ref={ref}>
      {children}
    </div>
  );
});

export default Modal;
