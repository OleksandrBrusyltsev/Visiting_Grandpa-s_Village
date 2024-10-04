"use client";

import React from 'react'
import Image from 'next/image';

import LoginForm from './LoginForm';
import Icon from '../ui/Icon/Icon';

import s from './Login.module.scss';

type Props = {}

export default function Login({}: Props) {
  return (
      <>
          <div className='container'>
                <div className={s.heroWrapper}>
                    <div className={s.grandpa}>
                        <Image
                            src={"/images/grandpas/Grandpa1.png"}
                            alt="Grandpa photo"
                            className={s.grandpa}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
                            fill
                        />
                    </div>
                    <h1 className={s.heroTitle}>
                        Вітаю тебе на сторінці, де ми зможемо познайомитись ближче
                    </h1>
                    <h2 className={s.heroDescr}>
                        “Далі побачиш просту форму, де зможеш ввійти в свій особистий кабінет, або зареєструватись”
                    <Icon name="curve-signin" className={s.curve} />
                    </h2>
                </div>
                <LoginForm/>
          </div>
      </>
  )
}