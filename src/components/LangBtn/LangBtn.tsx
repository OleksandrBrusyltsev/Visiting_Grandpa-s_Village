import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const LangBtn = ({ className }: any) => {
  const router = useRouter()
  const localActive = useLocale()

  const [isPending, startTransition] = useTransition()
  const [activeButton, setActiveButton] = useState<string | null>(null)

  useEffect(() => {
    setActiveButton(localActive)
  }, [localActive])

  const changeLanguageHandler = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <div
      className={`${className} font-headline flex items-center space-x-2 text-[16px]`}
    >
      <button
        disabled={isPending}
        value="uk"
        onClick={() => changeLanguageHandler('uk')}
        className={`transform transition duration-300 ease-in-out hover:scale-110 ${
          activeButton === 'uk' ? 'text-[#B4854F]' : ''
        }`}
      >
        UA
      </button>
      <span>/</span>
      <button
        disabled={isPending}
        onClick={() => changeLanguageHandler('en')}
        className={`transform transition duration-300 ease-in-out hover:scale-110 ${
          activeButton === 'en' ? 'text-[#B4854F]' : ''
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LangBtn
