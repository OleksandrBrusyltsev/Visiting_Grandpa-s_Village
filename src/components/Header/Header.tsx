'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import PopupMenu from './PopupMenu'
import LangBtn from '../LangBtn/LangBtn'
import cabinet from '@/assets/icons/cabinet.svg'
const logo = '/images/logo-main.svg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Header = () => {
  const locale = useLocale()

  const [isVisible, setVisible] = useState(false)

  const handlePopup = () => setVisible(!isVisible)

  return (
    <header className="bg-[#C2BFB7]/75">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-[20px] py-[14px]">
        <div className="block lg:hidden">
          <div
            onClick={handlePopup}
            className={
              isVisible
                ? 'tham-active tham tham-e-squeeze tham-w-6'
                : 'tham tham-e-squeeze tham-w-6'
            }
          >
            <div className="tham-box">
              <div className="tham-inner" />
            </div>
          </div>
        </div>
        <Link href={`/${locale}`}>
          <Image src={logo} alt={'logo'} width={277} height={135} />
        </Link>
        <div className="flex items-center gap-[30px]">
          <LangBtn className="hidden lg:block" />
          <Link href="/">
            <Image
              src={cabinet}
              alt={'logo'}
              width={24}
              height={24}
              className="duration-300 hover:scale-110 hover:shadow-lg"
            />
          </Link>

          <Link
            href={`/${locale}/booking`}
            className="font-headline hidden w-[188px] rounded-[15px] bg-[#3F5540] p-[16px] text-center text-[22px] font-semibold text-white duration-300 hover:scale-105 hover:bg-[#4E7052] lg:block"
          >
            Завітати
          </Link>
        </div>
        {isVisible && <PopupMenu handlePopup={handlePopup} />}
      </div>
    </header>
  )
}

export default Header
