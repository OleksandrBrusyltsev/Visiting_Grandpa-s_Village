"use client";
<<<<<<< HEAD
import { FC, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import s from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  type: "calendar" | "guestsForm";
}

const Modal: FC<ModalProps> = ({ isOpen, children, type }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      console.log(isOpen, "isOpen");
      if (isOpen) {
        gsap.fromTo(
          modalRef.current,
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
      } else {
        gsap.to(modalRef.current, {
          opacity: 0,
          duration: 0,
          scale: 0.8,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [isOpen]}
  );
  return (
    <div className={s.modal} ref={modalRef}>
      {type === "calendar" && <div className={s.calendar}>{children}</div>}
      {type === "guestsForm" && <div className={s.guestsForm}>{children}</div>}
    </div>
  );
};
=======
import { FC, forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

import s from "./Modal.module.scss";

gsap.registerPlugin(useGSAP);      

type ModalProps = {
  visible: boolean;
  children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({children, visible}, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(ref, () => containerRef.current!);
  useGSAP(() => {
    if (containerRef.current) {
      if (visible) {
        gsap.to(containerRef.current, {
          autoAlpha: 1,
          scale: 1,
          ease: "power2.out"
        });
      } else {
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          scale: 0.8,
          ease: "power2.out"
        });
      }
    }
  }, [visible]);

  return (
    <div className={s.modal} ref={containerRef}>
      {children}
    </div>
  );
});
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01

export default Modal;
