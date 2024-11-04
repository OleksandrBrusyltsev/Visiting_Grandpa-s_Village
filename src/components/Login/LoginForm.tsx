"use client";

import React, { useRef, useState } from 'react'
import Link from 'next/link';

import Button from '../ui/Button/Button';

import s from './LoginForm.module.scss';
import { useMainStore } from '@/stores/store-provider';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type Props = {}

export default function LoginForm({ }: Props) {
    const locale = useLocale();

    const [signin, setSignin] = useState(true);
    const [signup, setSignup] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const setUser = useMainStore((state) => state.setUser);

    const { replace } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (error) setError('');
        
        if (validateInputs()) {
            
            !loading && setLoading(true);
            const formData = new FormData(e.target as HTMLFormElement);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            })

            setLoading(false);

            if (!response.ok) {
                const errorText: {
                    error: string
                } = await response.json();
                setError(errorText.error);
                return
            }

            const user = await response.json();

            if (user) {
                setUser(user);
                (e.target as HTMLFormElement).reset();
                replace(`/${locale}/profile`);
            }
        }
    }

    const validateInputs = () => {

        let isValid = true;
        if (!emailRef.current?.value) {
            setEmailErrorMessage("Поле для логіну обов'язкове");
            isValid = false;
        } else {
            setEmailErrorMessage('');
        }

        if (!passwordRef.current?.value) {
            setPasswordErrorMessage("Поле для пароля обов'язкове");
            isValid = false;
        } else {
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <section >
            <div className={s.formWrapper}>
                <div className={s.formTitleWrapper}>
                    <h2
                        className={`${s.formTitle} ${signin ? s.active : ''}`}
                        onClick={() => {
                            // setSignin(!signin);
                            // setSignup(!signup);
                        }}>
                        Увійти
                    </h2>
                    <h2
                        className={`${s.formTitle} ${signup ? s.active : ''}`}
                        onClick={() => {
                            // setSignup(!signup);
                            // setSignin(!signin);
                        }}>
                        Зареєструватися
                    </h2>
                </div>
                {signin && <form className={s.signin} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={s.label}>Пошта
                        <input
                            ref={emailRef}
                            className={s.signinInput}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="пошта"
                            onChange={
                                () => setEmailErrorMessage('')
                            }
                        />
                        {
                            emailErrorMessage && <p className={s.error}>{emailErrorMessage}</p>
                        }
                    </label>
                    <label htmlFor="password" className={s.label}>Пароль
                        <input
                            ref={passwordRef}
                            className={s.signinInput}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="пароль"
                            onChange={
                                () => setPasswordErrorMessage('')
                            }
                        />
                        {
                            passwordErrorMessage && <p className={s.error}>{passwordErrorMessage}</p>
                        }
                    </label>
                    {/* <Link href="#" className={s.forgotPassword}>Не пам’ятаєш пароль?</Link> */}
                    {
                        error && <p className={s.error}>{error}</p>
                    }
                    <Button
                        type='submit'
                        label='Увійти'
                        size='large'
                        disabled={loading}
                        className={s.button}
                    />
                </form>}
                {signup && <form className={s.signup}>
                    <p>
                        Форма реєстрації
                    </p>
                </form>}
            </div>
        </section>
    )
}