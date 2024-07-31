import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks/useClickOutside';

import s from './Modal.module.scss';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    wrapperStyles?: React.CSSProperties
}

export default function Modal({ children, isOpen, onClose, wrapperStyles }: Props) {
    
    const body = typeof document !== "undefined" ? document.querySelector('body') : null;
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
    const handleClose = contextSafe(() => {
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
    })

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
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
    
    if (!isOpen || !body) return null;
    
    return createPortal(<div className={s.overlay} ref={modalRef} id='overlay'>
        <div className={s.modalContent} ref={contentRef} style={{...wrapperStyles}}>
            {children}
            <button className={s.close} onClick={handleClose}>&times;</button>
        </div>
    </div>, body)
}
 