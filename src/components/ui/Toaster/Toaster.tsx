"use client";
import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Icon from '../Icon/Icon';
import { getRemainingToasterDelay, getActivePromoData } from '@/functions/tosterHelpers';
import { getData } from '@/actions/getData';

import s from './Toaster.module.scss';

export default function Toaster() {
    const locale = useLocale();
    
    const [isOpen, setIsOpen] = useState(false);
    const [toasterData, setToasterData] = useState<{
        isPromoActive: boolean;
        promoText: string;
        timeout: number;
    } | null>(null);

    const toasterRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    //получаем данные для тостера и отображаем его или устанавливаем таймер для его следующего показа
    useEffect(() => {
        (
            async () => {
                const data = await getData<AdvToaster[]>('toasters');
                // формируем актуальные данные для тостера
                const currentPromoData = getActivePromoData(data, locale);
                if (!currentPromoData.isPromoActive) return
                
                setToasterData(currentPromoData);

                //устанавливаем Timeout до следующего показа
                const toasterDelay = getRemainingToasterDelay();
                if (toasterDelay > 0) {
                    //пользователь заходит на/обновляет страницу при сохраненном значении LS таймера
                    //устанавливаем Timeout до следующего показа
                    handleSetTimeoutForToaster(toasterDelay);
                } else setIsOpen(true);
            }
        )()
    }, [locale]);

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
        if (!toasterData || !toasterData.timeout) return
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
            }, toasterData.timeout);
            const nextShowTimeForLS = `${timeNow + toasterData.timeout}`;
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
                <p className={s.toasterText}>{toasterData?.promoText}
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