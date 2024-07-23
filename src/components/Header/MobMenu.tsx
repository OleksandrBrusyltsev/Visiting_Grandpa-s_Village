'use client'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { FC, useEffect, useRef, MouseEvent } from 'react'
import LangBtn from '@/components/LangBtn/LangBtn'

interface PopupMenuProps {
  navigationLinks: any
  handlePopup: () => void
  isVisible: boolean
}

const MobMenu: FC<PopupMenuProps> = ({
  handlePopup,
  isVisible,
  navigationLinks,
}) => {
  const locale = useLocale()

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isVisible])

  const handleInnerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className="wrapper_menu right-0 top-0 z-10 hidden min-h-[100svh] w-[100vw] items-center justify-center bg-black/50"
      onClick={handlePopup}
    >
      <div
        onClick={handleInnerClick}
        className="inner_wrapper_menu dsds rounded-lg bg-[#3F5540] p-10"
      >
        <ul className="font-headline text-[16px] text-white">
          {navigationLinks.map(({ id, link, text }: any) => (
            <li
              key={id}
              className="mb-[16px] h-full w-[274px] border-b-[1px] border-white pb-[10px] text-center"
            >
              <Link href={`/${locale}/${link}`} onClick={handlePopup}>
                {text}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-center">
            <LangBtn />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobMenu
