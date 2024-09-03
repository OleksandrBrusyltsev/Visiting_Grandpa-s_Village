"use client";
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Icon from '../Icon/Icon';
import { doesTimerHaveLeftTime, shouldToasterBeShown } from '@/functions/tosterHelpers';

import s from './Toaster.module.scss';

type Props = {
    promoText: string,
    isPromoActive: boolean,
    timeout: number
}

export default function Toaster({ promoText, isPromoActive, timeout }: Props) {
    const [isOpen, setIsOpen] = useState(shouldToasterBeShown(isPromoActive));

    const toasterRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    //пользователь заходит на/обновляет страницу при сохраненном значении LSтаймера
    //устанавливаем Timeout до следующего показа
    useEffect(() => {
        if (isOpen) return
        if (doesTimerHaveLeftTime()) {
            const savedToasterShowTime = Number(localStorage.getItem('nextToasterShowTime'));
            handleSetTimeoutForToaster(savedToasterShowTime);
        }
    }, [])

    //показываем/скрываем тостер
    useEffect(() => {
        if (isOpen) {
            animationRef.current?.play();
        } else {
            animationRef.current?.reverse();
        }
    }, [isOpen]);

    const onClose = () => {
        setIsOpen(false);
        handleSetTimeoutForToaster();
    };

    //аргумент передаем только для первого рендера/обновления страницы - он устанавливает Timeout на основе сохраненных значений LSтаймера
    // при закрытии тостера - Timeout устанавливается на стандартное значение
    const handleSetTimeoutForToaster = (endTime?: number) => {

        const currentTime = Date.now();

        if (!endTime) {
            //кейс при закрытии окна тостера или открытии новой сессии с истекшим LSтаймером
            setTimeout(() => {
                setIsOpen(true);
            }, timeout);
            const nextShowTimeForLS = `${currentTime + timeout}`;
            localStorage.setItem('nextToasterShowTime', String(nextShowTimeForLS));
        } else {
            //кейс открытия/обновления страницы со старым не истекшим LSтаймером
            setTimeout(() => {
                setIsOpen(true);
            }, endTime - currentTime);
        }
    }

    useGSAP(() => {
        gsap.set(toasterRef.current, { visibility: 'visible' });
        animationRef.current = gsap.from(toasterRef.current, {
            y: 100,
            autoAlpha: 0,
            ease: "power1.out",
            delay: 1,
            paused: true
        })
    })

    return (
        <div className={s.toasterWrapper} ref={toasterRef}>
            <div className={`${s.toasterContent} container`}>
                <p className={s.toasterText}>{promoText}
                    <Icon className={s.heartIcon} name="toaster-heart" />
                </p>
                <button
                    className={s.toasterClose}
                    onClick={onClose}
                >&times;</button>
            </div>
        </div>
    )
}