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
        <Link href={`/${locale}`}>
          <Image src={logo} alt={'logo'} width={277} height={135} />
        </Link>
        <div className="flex items-center gap-[30px]">
          <LangBtn />
          <Link href="/">
            <Image src={cabinet} alt={'logo'} width={24} height={24} />
          </Link>
          <Link
            href={`/${locale}/booking`}
            className="font-headline w-[188px] rounded-[15px] bg-[#3F5540] p-[16px] text-center text-[22px] font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-[#4E7052]"
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
