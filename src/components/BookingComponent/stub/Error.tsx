import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Button from '@/components/ui/Button/Button';

import s from './Feedback.module.scss';

type Props = {
    isOpen: boolean;
    handleClose: (() => void) | undefined;
    handleRepeatFilling: () => void
}

export default function Error({handleClose, isOpen, handleRepeatFilling}: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    
    useGSAP(() => {
        if(isOpen) {
            gsap.set(wrapperRef.current, {display:'flex'});
            gsap.to(wrapperRef.current, {
                autoAlpha: 1, 
                ease: 'power1.out',
                delay: 0.4,
                duration: 0.3,
            });
        } else gsap.set(wrapperRef.current, {display:'none'});
    }, {dependencies: [isOpen]});

    if(!handleClose) return

    return (
        <div className={`${s.wrapper} ${s.error}`} ref={wrapperRef}>
            <Image style={{
                position: 'relative',
                zIndex: -2
            }} src="/images/grandpas/Grandpa3.png" alt="Error-grandpa" width={186} height={210} />
            <h1 className={s.title}>{`Щось пішло не так :(`}</h1>
            <h2 className={s.subTitle}>Запит НЕ відправлено</h2>
            <p className={s.description}>
                Повторіть спробу ще раз
            </p>
            <button className={s.closeBtn} onClick={handleClose}>&times;</button>
            <Button className={s.mainBtn} onClick={handleRepeatFilling} label='Заповнити Форму' size='default' />
        </div>
    )
}