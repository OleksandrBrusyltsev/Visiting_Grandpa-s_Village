
import Script from 'next/script';
import { useLocale, useTranslations } from 'next-intl';
import { useContext, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PhoneInputMask from 'react-input-mask';

import { telegramAction } from '@/actions/tgBotAction';
import { MatchMediaContext } from '@/context/MatchMediaContext';
import Button from '@/components/ui/Button/Button';
import { OrderType } from '../BookingComponent';

import s from "./Main.module.scss";
import { messages } from '@/data/bookingStub';

type Props = Readonly<{
    order: OrderType;
    isOpen: boolean;
    handleClose: (() => void) | undefined;
    handleBotResponse: (status: boolean | null) => void
}>;
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

export default function ContactForm({ order, isOpen, handleClose, handleBotResponse }: Props) {
    const { isMobile } = useContext(MatchMediaContext);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const recaptchaId = useRef<string | null>(null);

    const locale = useLocale() as Language;
    const t = useTranslations("BookingStub");

    const { title, subtitle, message } = messages[0];


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
            window.onloadCallback = () => { };
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
        if (isOpen) {
            gsap.set(wrapperRef.current, { display: 'flex' });
            gsap.to(wrapperRef.current, {
                opacity: 1,
                ease: 'power1.out',
                duration: 0.3
            })
        }
        if (!isOpen) {
            gsap.to(wrapperRef.current, {
                opacity: 0,
                ease: 'power1.out',
                duration: 0.3,
                onComplete: () => { gsap.set(wrapperRef.current, { display: 'none' }) }
            })
        }
    }, { dependencies: [isOpen] });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);

        let formData: { [key: string]: any } = Object.fromEntries(data.entries());
        //валидация номера телефона
        if (formRef.current && !validatePhone(formData.phone)) {
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

        formData = { ...formData, recaptchaResponse };

        formRef.current?.requestSubmit();

        const botResponse = await telegramAction(formData);
        if (botResponse?.status) {
            //reset form    
            (e.target as HTMLFormElement).reset();
        }

        handleBotResponse(botResponse ? botResponse.status : null);
    }

    if (!handleClose) return

    return (
        <>
            <div className={s.wrapper} ref={wrapperRef}>
                <h1 className={s.title}>{title[locale]}</h1>
                <form className={s.form} onSubmit={onSubmit} ref={formRef}>
                    <label htmlFor="name" className={s.label}>
                        {isMobile ? null : <span>{t('name')}</span>}
                        <input
                            type="text"
                            name='name'
                            autoFocus
                            maxLength={30}
                            className={s.input}
                            autoComplete='off'
                            placeholder={isMobile ? t('namePlaceholder') : ''}
                            title=''
                            required
                            onInvalid={(e: any) => {
                                e.target.setCustomValidity(t('requiredField'));
                                // e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                e.target.setCustomValidity('');
                            }}
                        />
                    </label>
                    <label htmlFor="phone" className={s.label}>
                        {isMobile ? null : <span>{t('phone')}</span>}
                        <PhoneInputMask
                            mask="+38 (099) 999 99 99"
                            maskPlaceholder="_"
                            autoComplete='off'
                            placeholder="+38 (012) 345 67 89"
                            required
                            type='tel'
                            title=''
                            pattern="\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}"
                            onInvalid={(e: any) => {
                                e.target.setCustomValidity(t('requiredField'));
                                // e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                if (e.target.value === '' || e.target.value === '+3 (0__) ___ __ __') {
                                    e.target.setCustomValidity(t('requiredField'));
                                    // e.target.style.outline = '2px solid red';
                                } else if (!validatePhone(e.target.value)) {
                                    e.target.setCustomValidity(t('phoneFormat'));
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
                        {isMobile ? null : <span>{t('commentLabel')}</span>}
                        <textarea
                            name="message"
                            defaultValue={t('comment', {
                                house: order.house ? ` ${order.house} ` : ' ',
                                guests: order.guests,
                                startDate: order.startDate,
                                endDate: order.endDate
                            })}
                            placeholder={message[locale]}
                            rows={5}
                            required
                            title=''
                            maxLength={500}
                            autoComplete='off'
                            onInvalid={(e: any) => e.target.setCustomValidity(t('requiredField'))}
                            onChange={(e: any) => e.target.setCustomValidity('')}
                            className={s.input}
                        />
                    </label>
                    <div className={`${s.recaptcha} g-recaptcha`} id='g-recaptcha' data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN} />
                    <Button
                        label={subtitle[locale]}
                        className={s.btn}
                        type='submit'
                        size='default'
                    />
                </form>
                <div className={s.altContacts}>
                    <p className={s.altContact}>{t('or')}</p>
                    <p className={s.altContact}>{t('call')}
                        <a href="tel:+380931919663" className={s.phone}> +38(093) 19-19-663</a>,
                    </p>
                    <p className={s.altContact}>{t('write')}
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