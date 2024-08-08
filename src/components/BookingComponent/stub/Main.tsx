
import Script from 'next/script';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PhoneInputMask from 'react-input-mask';

import { telegramAction } from '@/actions/tgBotAction';
import { MatchMediaContext } from '@/context/MatchMediaContext';
import Button from '@/components/ui/Button/Button';
import { BotResponseStateType, OrderType } from '../BookingComponent';

import s from "./Main.module.scss";
import {messages} from '@/data/bookingStub';

type Props = {
    order: OrderType;
    isOpen: boolean;
    handleClose: (() => void) | undefined;
    handleBotResponse: (props: BotResponseStateType | null) => void
}
declare global {
    interface Window {
        grecaptcha: {
            getResponse: (opt_widget_id?: string | null) => string;
            render: (container: string,
                parameters: {
                    sitekey: string;
                }) => string;
            reset: (opt_widget_id?: string) => void;
        };
        onloadCallback: () => void;
    }
  }
const validatePhone = (phone: string) => {
    return phone.match(/^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/)
}

export default function ContactForm({order, isOpen, handleClose, handleBotResponse}: Props) {
    const {isMobile} = useContext(MatchMediaContext);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const recaptchaId = useRef<string | null>(null);
    const locale = useLocale();
    const {title, subtitle, message} = messages[0];

    const loadRecaptcha = () => {
        if (window.grecaptcha) {
            if (recaptchaId.current !== null) {
                window.grecaptcha.reset(recaptchaId.current);
            } else {
                recaptchaId.current = window.grecaptcha.render('g-recaptcha', {
                    sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN as string,
                });
            }
        }
    };

    //Загрузка reCaptcha в мегавселенную Window через onload загрузчик, указзаный в searchParams скрипта reCaptcha
    useEffect(() => {
        window.onloadCallback = () => {
            loadRecaptcha();
        };
        return () => {
            window.onloadCallback = () => {};
        };
    }, []);

    //Костыль для сброса reCaptcha при закрытии модалки
    useEffect(() => {
        if (typeof window !== 'undefined' && window.grecaptcha && isOpen) {
            loadRecaptcha();
        }
    }, [order, isOpen]);

    //анимация открытия/закрытия главной формы
    useGSAP(() => {
        if(isOpen) {
            gsap.set(wrapperRef.current, {display:'flex'});
            gsap.to(wrapperRef.current, {
                opacity: 1, 
                ease: 'power1.out',
                duration: 0.3 
            })
        }
        if(!isOpen) {
            gsap.to(wrapperRef.current, {
                opacity: 0, 
                ease: 'power1.out',
                duration: 0.3, 
                onComplete: () => {gsap.set(wrapperRef.current, {display:'none'})}
            })
        }
    }, {dependencies: [isOpen]});

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = new FormData(e.target as HTMLFormElement);

        let formData: { [key: string]: any } = Object.fromEntries(data.entries());
        //валидация номера телефона
        if(formRef.current && !validatePhone(formData.phone)) {
            (formRef.current[1] as HTMLInputElement).style.outline = '2px solid red';
            (formRef.current[1] as HTMLInputElement).focus();
            return
        }
        //получение ответа от reCaptcha для дальнейшей валидации в telegramAction()
        const recaptchaResponse = window.grecaptcha.getResponse(recaptchaId.current);
        if (recaptchaResponse.length === 0) {
            alert('Перевірка reCaptcha не завершена');
            return;
        }

        formData = {...formData, recaptchaResponse};
        console.log(formData);
        
        formRef.current?.requestSubmit();

        const botResponse = await telegramAction(formData);
        if(botResponse?.status) {
            //reset form    
            (e.target as HTMLFormElement).reset();
        } 

        handleBotResponse(botResponse ? ({status: botResponse.status} as BotResponseStateType) : null);
    }
    
    if(!handleClose) return

    return (
        <>
            <div className={s.wrapper} ref={wrapperRef}>
                <h1 className={s.title}>{title}</h1>
                <form className={s.form} onSubmit={onSubmit} ref={formRef}>
                    <label htmlFor="name" className={s.label}>
                        {isMobile ? null : <span>Ім&apos;я</span>}
                        <input 
                            type="text" 
                            name='name'
                            autoFocus
                            className={s.input} 
                            autoComplete='off'
                            placeholder={isMobile ? 'Ваше ім’я' : ''}
                            title=''
                            required 
                            onInvalid={(e: any) => {
                                e.target.setCustomValidity('Це поле є обов’язковим');
                                // e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                e.target.setCustomValidity('');
                            }}
                        />
                    </label>
                    <label htmlFor="phone" className={s.label}>
                        {isMobile ? null : <span>Телефон</span>}
                        <PhoneInputMask
                            mask="+38 (099) 999 99 99"
                            maskPlaceholder="_"
                            autoComplete='off'
                            placeholder="+38 (012) 345 67 89"
                            required
                            title=''
                            pattern="\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}"
                            onInvalid={(e: any) => {
                                e.target.setCustomValidity('Це поле є обов’язковим');
                                // e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                if (e.target.value === '' || e.target.value === '+3 (0__) ___ __ __') {
                                    e.target.setCustomValidity('Це поле є обов’язковим');
                                    // e.target.style.outline = '2px solid red';
                                } else if(!validatePhone(e.target.value)) {
                                    e.target.setCustomValidity('Формат номеру телефону +38 (0XX) XXX XX XX');
                                } else {
                                    e.target.setCustomValidity('');
                                    // e.target.style.outline = 'initial';
                                }
                            }}
                            name='phone'
                            className={s.input}
                        />
                    </label>
                    <label htmlFor="message" className={s.label}>
                        {isMobile ? null : <span>Коментар</span>}
                        <textarea 
                            name="message" 
                            defaultValue={`Потрібен номер на ${order.guests}х з ${order.startDate}-${order.endDate}`} 
                            placeholder={message}
                            rows={5} 
                            required
                            title=''
                            autoComplete='off'
                            onInvalid={(e: any) => e.target.setCustomValidity('Це поле є обов’язковим')}
                            onChange={(e: any) => e.target.setCustomValidity('')}
                            className={s.input}
                        />
                    </label>
                    <div className={`${s.recaptcha} g-recaptcha`} id='g-recaptcha' data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}/>
                    <Button 
                        label={subtitle}
                        className={s.btn} 
                        type='submit' 
                        size='default'
                    />
                </form>
                <div className={s.altContacts}>
                    {isMobile ? null : <p className={s.altContact}>або
                    </p>}
                    <p className={s.altContact}>зателефонуйте 
                        <a href="tel:+380931919663" className={s.phone}> +38(093) 19-19-663</a>,
                    </p>
                    <p className={s.altContact}>напишіть нам в Телеграм 
                        <a
                            href="https://t.me/VisitingGrandpasVillage_Operator"
                        >
                            <svg className={s.telegramIcon}>
                                <use xlinkHref="/sprite.svg#telegram" />
                            </svg>
                        </a>
                    </p>
                </div>
                <button className={s.closeBtn} onClick={handleClose}>&times;</button>

            </div>
            <Script id="recaptcha" strategy="afterInteractive" src={`https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=${locale}`} />
        </>
    )
}