"use client";
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { getRemainingToasterDelay } from '@/functions/toasterHelpers';
import Icon from '../Icon/Icon';

import s from './Toaster.module.scss';

type Props = Readonly<{
    data: ActiveToaster  
}>

export default function Toaster({data}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const toasterRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    //получаем данные для тостера и отображаем его или устанавливаем таймер для его следующего показа
    useEffect(() => {
        //устанавливаем Timeout до следующего показа
        const toasterDelay = getRemainingToasterDelay();
        if (toasterDelay > 0) {
            //пользователь заходит на/обновляет страницу при сохраненном значении LS таймера
            //устанавливаем Timeout до следующего показа
            handleSetTimeoutForToaster(toasterDelay);
        } else setIsOpen(data?.isPromoActive);
    }, []);

    //анимация тостера
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
    const handleSetTimeoutForToaster = (endTime: number = 0) => {
        if (!data || !data.timeout) return
        const timeNow = Date.now();
        if (endTime > 0) {
            //кейс открытия/обновления страницы со старым не истекшим LSтаймером
            setTimeout(() => {
                setIsOpen(true);
            }, endTime - timeNow);
        } else {
            //кейс при первом открытии окна тостера или открытии новой сессии с истекшим LSтаймером
            setTimeout(() => {
                setIsOpen(true);
            }, data.timeout);
            const nextShowTimeForLS = `${timeNow + data.timeout}`;
            localStorage.setItem('nextToasterShowTime', String(nextShowTimeForLS));
        }
    }

    useGSAP(() => {
        gsap.set(toasterRef.current, { visibility: 'visible' });
        const timeline = gsap.timeline({ paused: true });
        timeline.from(toasterRef.current, {
            y: 100,
            autoAlpha: 0,
            ease: "power1.out",
            delay: 3,
        })
        animationRef.current = timeline;
    })

    return (
        <div className={s.toasterWrapper} ref={toasterRef}>
            <div className={`${s.toasterContent} container`}>
                <p className={s.toasterText}>{data?.promoText}
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