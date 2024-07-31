
import React, { useEffect, useRef } from 'react'
import PhoneInputMask from 'react-input-mask';
import Button from '@/components/ui/Button/Button';
import { OrderType } from '../BookingComponent';

import s from "./Contact.module.scss";
import { telegramAction } from '@/actions/tgBotAction';
import Script from 'next/script';

type Props = {
    order: OrderType
}
declare global {
    interface Window {
      grecaptcha: {
        getResponse: () => string;
      };
    }
  }
const validatePhone = (phone: string) => {
    return phone.match(/^\+38\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/)
}

export default function ContactForm({order}: Props) {
    const contactFormRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const grecaptchaRef = useRef<typeof window | null>(null);

    useEffect(() => {
      const onloadCallback = () => {
        grecaptchaRef.current = window;
      };
  
      if (window) {
        onloadCallback();
      }
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData(e.target as HTMLFormElement);

        let formData: { [key: string]: any } = Object.fromEntries(data.entries());
        if(formRef.current && !validatePhone(formData.phone)) {
            (formRef.current[1] as HTMLInputElement).style.outline = '2px solid red';
            (formRef.current[1] as HTMLInputElement).focus();
            return
        }
        
        if (!grecaptchaRef.current?.grecaptcha) return;
        const captureResponse = grecaptchaRef.current.grecaptcha.getResponse();
        if (captureResponse.length === 0) {
            alert('Перевірка reCaptcha не завершена');
            return;
        }
        formData = {...formData, ...order, captureResponse};
        console.log(formData);
        
        formRef.current?.requestSubmit();
        try {
            await telegramAction(formData);
          } catch (error) {
            alert(`Помилка відправлення даних в бот Telegram: ${error}`);
            return;
          }

        //reset form    
        (e.currentTarget as HTMLFormElement).reset();
        
        //close form
        const closeBtn = contactFormRef.current && contactFormRef.current.nextElementSibling as HTMLButtonElement;
        closeBtn?.click();
    }

    return (
        <>
            <div className={s.wrapper} ref={contactFormRef}>
                <h1 className={s.title}>
                    Найближчим часом з вами зв’яжеться помічник Дідуся для уточнення бронювання
                </h1>
                <form className={s.form} onSubmit={onSubmit} ref={formRef}>
                    <label htmlFor="name" className={s.label}>
                        <span>Ім&apos;я</span>
                        <input 
                            type="text" 
                            name='name' 
                            className={s.input} 
                            autoComplete='off'
                            title=''
                            required 
                            onInvalid={(e: any) => {
                                e.target.setCustomValidity('Це поле є обов’язковим');
                                e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                e.target.setCustomValidity('');
                                if(e.target.value){
                                    e.target.style.outline = 'initial';
                                }
                            }}
                        />
                    </label>
                    <label htmlFor="phone" className={s.label}>
                        <span>Телефон</span>
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
                                e.target.style.outline = '2px solid red';
                            }}
                            onChange={(e: any) => {
                                if (e.target.value === '' || e.target.value === '+3 (0__) ___ __ __') {
                                    e.target.setCustomValidity('Це поле є обов’язковим');
                                    e.target.style.outline = '2px solid red';
                                } else if(!validatePhone(e.target.value)) {
                                    e.target.setCustomValidity('Формат номеру телефону +38 (0XX) XXX XX XX');
                                } else {
                                    e.target.setCustomValidity('');
                                    e.target.style.outline = 'initial';
                                }
                            }}
                            name='phone'
                            className={s.input}
                        />
                    </label>
                    <label htmlFor="message" className={s.label}>
                        <span>Коментар </span>
                        <textarea 
                            name="message" 
                            defaultValue={`Потрібен номер на ${order.guests}х з ${order.startDate}-${order.endDate}`} 
                            placeholder='Опишіть мету вашого звернення'
                            rows={5} 
                            required
                            title=''
                            autoComplete='off'
                            onInvalid={(e: any) => e.target.setCustomValidity('Це поле є обов’язковим')}
                            onChange={(e: any) => e.target.setCustomValidity('')}
                            className={s.input}
                        />
                    </label>
                    <div className={s.recaptcha} data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN} />
                    <Button 
                        label='Відправити запит на дзвінок' 
                        className={s.btn} 
                        type='submit' 
                        disabled={false} 
                        size='default'
                    />
                </form>
                <div className={s.altContacts}>

                <p className={s.altContact}>або
                    </p>
                <p className={s.altContact}>зателефонуйте 
                    <a href="tel:+380931919663" className={s.phone}> +38(093) 19-19-663</a> ,
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
            </div>
            <Script id="recaptcha" src={"https://www.google.com/recaptcha/api.js"} />
        </>
    )
}