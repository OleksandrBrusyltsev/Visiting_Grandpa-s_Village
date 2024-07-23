'use client'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import MobMenu from './MobMenu'
import LangBtn from '../LangBtn/LangBtn'
import cabinet from '@/assets/icons/cabinet.svg'
const logo = '/images/logo-main.svg'
import { navigationLinksUn, navigationLinksEn } from '@/data/header/popupData'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Header = () => {
  const locale = useLocale()
  const { contextSafe } = useGSAP()
  const t = useTranslations()

  const navigationLinks =
    locale === 'uk' ? navigationLinksUn : navigationLinksEn

  const [isVisible, setVisible] = useState(false)

  const handlePopup = contextSafe(() => {
    if (isVisible) {
      gsap.to('.inner_wrapper_menu', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.in(1.7)',
        onComplete: () => {
          gsap.to('.wrapper_menu', {
            display: 'none',
            duration: 0.1,
            opacity: 0,
            onComplete: () => setVisible(false),
          })
        },
      })
    } else {
      setVisible(true)
      gsap.to('.wrapper_menu', {
        opacity: 1,
        position: 'absolute',
        display: 'flex',
      })
      gsap.fromTo(
        '.inner_wrapper_menu',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      )
    }
  })

  return (
    <header>
      <div className="bg-[#C2BFB7]/75">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between px-[20px] py-[14px] lg:items-center">
          <div className="block lg:hidden">
            <div
              onClick={handlePopup}
              className={
                isVisible
                  ? 'tham tham-active tham-e-squeeze tham-w-6'
                  : 'tham tham-e-squeeze tham-w-8'
              }
            >
              <div className="tham-box">
                <div className="tham-inner bg-[#3F5540]" />
              </div>
            </div>
          </div>
          <Link href={`/${locale}`}>
            <Image
              src={logo}
              alt={'logo'}
              width={277}
              height={135}
              className="h-[90px] w-[144px] lg:h-[135px] lg:w-[277px]"
            />
          </Link>
          <div className="flex items-center gap-[30px]">
            <LangBtn className="hidden lg:block" />
            <Link href="/">
              <Image
                src={cabinet}
                alt={'logo'}
                width={28}
                height={28}
                className="duration-300 hover:scale-110"
              />
            </Link>

            <Link
              href={`/${locale}/booking`}
              className="hidden w-[188px] rounded-[15px] bg-[#3F5540] p-[16px] text-center font-headline text-[22px] font-semibold text-white duration-300 hover:scale-105 hover:bg-[#4E7052] lg:block"
            >
              {t('Index.visit')}
            </Link>
          </div>
          <MobMenu
            navigationLinks={navigationLinks}
            handlePopup={handlePopup}
            isVisible={isVisible}
          />
        </div>
      </div>
      <ul className="mx-auto hidden max-w-[1400px] items-end justify-between px-[30px] py-[14px] lg:flex lg:items-center">
        {navigationLinks.map(({ id, link, text }) => (
          <li
            key={id}
            className="group relative font-raleway text-[16px] uppercase"
          >
            <Link
              href={`/${locale}/${link}`}
              className="color-[#0C0C0C] inline-block font-normal text-black duration-300 group-hover:scale-110"
            >
              {text}
            </Link>
            <span className="mt-1 block h-0.5 w-0 bg-[#C2BFB7] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
