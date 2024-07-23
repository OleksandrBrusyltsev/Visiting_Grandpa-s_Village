import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useClickOutside } from '@/hooks/useClickOutside';

import s from './Modal.module.scss';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP(() => {
        gsap.timeline({
            defaults: {
                autoAlpha: 0,
                duration: 0.3
            }
        }).from(modalRef.current, {
        }).from(contentRef.current, {
            scale: 0.95
        }, ">-0.2");
    }, [isOpen]);

    const handleClose = contextSafe(() => {
        gsap.timeline({
            defaults: {
                duration: 0.3,
                autoAlpha: 0,
            }
        }).to(contentRef.current, {
        }).to(modalRef.current, {
            onComplete: () => onClose()
        }, ">-0.2")
    })

    const closeOnEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) handleClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        };
    }, []);

    useClickOutside(contentRef, handleClose);

    return (
        <>
            {
                isOpen ? (
                    <div className={s.overlay} ref={modalRef}>
                        <div className={s.modalContent} ref={contentRef}>
                            {children}
                            <button className={s.close} onClick={handleClose}>&times;</button>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}