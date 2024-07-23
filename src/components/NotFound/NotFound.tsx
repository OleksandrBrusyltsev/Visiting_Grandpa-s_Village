'use client'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Button from '../ui/Button/Button'

import s from './NotFound.module.scss'

function NotFound() {
  const t = useTranslations('NotFoundPage')
  const tUi = useTranslations('UI')
  const locale = useLocale()

  useGSAP(() => {
    const numbers = gsap.utils.toArray(`.${s.description} .${s.number}`)
    gsap
      .timeline({
        defaults: {
          ease: 'power1.out',
          autoAlpha: 0,
        },
      })
      .from(`.${s.title}`, {
        x: 100,
      })
      .from(
        `.${s.description}`,
        {
          x: -100,
        },
        '<',
      )
      .from(
        numbers,
        {
          x: -200,
          stagger: {
            each: 0.2,
            from: 'end',
          },
          rotate: `${-270 + 90}deg`,
        },
        '<',
      )
      .from(`.${s.grandpa}`, {
        autoAlpha: 0,
      })
      .from(
        `.${s.home}`,
        {
          y: -50,
        },
        '<',
      )
  })
  return (
    <main className={`${s.wrapper} container`}>
      <h1 className={s.title}>{t('title')}</h1>
      <p className={s.description}>
        <div className={s.number}>4</div>
        <div className={s.number}>
          0<div className={s.grandpa}></div>
        </div>
        <div className={s.number}>4</div>
      </p>
      <Link href={'/' + locale} className={s.home}>
        <Button label={tUi('home')} />
      </Link>
    </main>
  )
}

export default NotFound
