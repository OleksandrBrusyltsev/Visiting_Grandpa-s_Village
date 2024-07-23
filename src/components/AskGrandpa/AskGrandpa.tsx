'use client'

import { useState, useRef, FC, useContext } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import Icon from '../ui/Icon/Icon'
import { MatchMediaContext } from '@/context/MatchMediaContext'
import { useClickOutside } from '@/hooks/useClickOutside'

import style from './AskGrandpa.module.scss'

const IconAsk = ({ className }: { className: string }) => {
  const { isMobile } = useContext(MatchMediaContext)

  return isMobile ? (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.57195 32.557C3.62436 32.3216 3.58993 32.0751 3.47499 31.8631C1.86406 28.8913 1.00633 25.4816 1 21.9989C1.00049 10.3318 10.4063 1 22 1C33.594 1 43 10.3323 43 21.9998C43 33.6673 33.594 42.9996 22 42.9996L21.9941 42.9996C17.7921 43.0245 13.6598 41.7346 10.0705 39.2648C9.79202 39.0732 9.43562 39.0352 9.12305 39.1639L1.39284 42.3451L3.57195 32.557Z"
        fill="currentColor"
        stroke="#3F5540"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="12.3301" cy="21.97" rx="3" ry="3.3333" fill="#FAFAFA" />
      <ellipse cx="22.0215" cy="21.97" rx="3" ry="3.3333" fill="#FAFAFA" />
      <ellipse cx="31.7148" cy="21.97" rx="3" ry="3.3333" fill="#FAFAFA" />
    </svg>
  ) : (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.27323 27.2901C6.33685 27.0329 6.29581 26.761 6.15911 26.534C4.97075 24.561 4.34067 22.3023 4.33594 19.999C4.33652 12.3171 11.2511 6 20.0026 6C28.7545 6 35.6693 12.3176 35.6693 20C35.6693 27.6824 28.7545 34 20.0026 34L19.9973 34C16.8417 34.0168 13.7449 33.1446 11.0621 31.4832C10.8 31.3208 10.4775 31.2885 10.1883 31.3956L4.76037 33.406L6.27323 27.2901Z"
        fill="currentColor"
        stroke="#3F5540"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="19.5" r="2.5" fill="#FAFAFA" />
      <circle cx="19.5762" cy="19.5" r="2.5" fill="#FAFAFA" />
      <circle cx="27.6543" cy="19.5" r="2.5" fill="#FAFAFA" />
    </svg>
  )
}

const AskGrandpa: FC = () => {
  const [isVisible, setVisible] = useState(true)
  const telegramRef = useRef<HTMLDivElement>(null)
  useClickOutside(telegramRef, () => setVisible(true))

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handlePopup = () => {
    setVisible(!isVisible)
  }

  useGSAP(() => {
    gsap.from(`.${style.headlineWrapper}`, {
      x: 100,
      autoAlpha: 0,
      ease: 'power1.out',
      clearProps: true,
      scrollTrigger: {
        trigger: `.${style.headlineWrapper}`,
        start: 'top 90%',
      },
    })
  })

  return (
    <div className={`${style.askWrapper} container`}>
      <div className={style.headlineWrapper}>
        <p className={style.headline}>запитати дідуся</p>

        <div
          onClick={handlePopup}
          ref={telegramRef}
          className={`${style.telegramButtons} ${isVisible ? style.hidden : style.visible}`}
        >
          <Link href="https://t.me/VisitingGrandpasVillageBot" target="_blanc">
            <button className={style.telegramButton}>
              <Icon name="telegramAsk" className={style.telegramIcon} />
            </button>
          </Link>
          <button className={style.closeButton}>
            <Icon name="close" />
          </button>
        </div>
        <button
          onClick={handlePopup}
          className={`${style.askButton} ${isVisible ? style.visible : style.hidden}`}
        >
          <IconAsk className={style.askIcon} />
        </button>
      </div>
      <button className={style.arrowUpButton} onClick={scrollToTop}>
        <Icon name="arrow" className={style.arrowIcon} />
      </button>
    </div>
  )
}

export default AskGrandpa
