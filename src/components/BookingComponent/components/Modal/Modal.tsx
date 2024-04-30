"use client";
import s from "./Modal.module.scss";

const Modal = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={s.modal}>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
