"use client";
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

export default Modal;
