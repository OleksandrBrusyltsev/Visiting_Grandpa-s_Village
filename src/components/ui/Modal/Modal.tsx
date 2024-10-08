import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/useClickOutside';

import s from './Modal.module.scss';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    inner?: boolean;
    wrapperStyles?: React.CSSProperties
}
export type ModalHandle = {
    assignedClose: () => void;
}
// export default function Modal({ children, isOpen, onClose, inner, wrapperStyles }: Props) {
const Modal = forwardRef<ModalHandle, Props>(function Modal({children, isOpen, onClose, inner = true, wrapperStyles}, ref) {    
    const body = typeof document !== "undefined" ? document.querySelector('body') : null;
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    useImperativeHandle(ref, () => {
        return {
            assignedClose() {
                handleClose();
          }
        };
      }, []);

    //appearance animation
    const { contextSafe } = useGSAP(() => {
        if(modalRef.current && contentRef.current) {
            gsap.timeline({
                defaults: {
                    autoAlpha: 0,
                    duration: 0.3
                }
            }).from(modalRef.current, {
            }).from(contentRef.current, {
                scale: 0.95
            }, ">-0.2");
        }
    }, [isOpen]);
    
    //close animation
    const handleClose = onClose ? contextSafe(() => {
        if(modalRef.current && contentRef.current) {
            gsap.timeline({
                defaults: {
                    duration: 0.3,
                    autoAlpha: 0,
                }
            }).to(contentRef.current, {
            }).to(modalRef.current, {
                onComplete: () => onClose()
            }, ">-0.2");
        }
    }) : () => {};

    //handling exit on outside click
    const closeOnEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) handleClose();
    }
    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        };
    }, [isOpen]);
    
    //handling exit on esc key
    useClickOutside(contentRef, handleClose);

    //block body scrolling
    useEffect(() => {
        if (!body) return;
        if (isOpen) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
    
        return () => {
          document.body.style.overflow = '';
        };
    }, [isOpen, body]);
    
    if (!isOpen || !body) return null;
    
    return createPortal(<div className={s.overlay} ref={modalRef} id='overlay'>
        <div className={s.modalContent} ref={contentRef} style={{...wrapperStyles}}>
            {children}
            {inner && <button className={s.close} onClick={handleClose}>&times;</button>}
        </div>
    </div>, body)
})
 
export default Modal;