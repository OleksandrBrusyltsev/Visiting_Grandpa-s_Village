import React, { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const LangBtn = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const changeLanguageHandler = (nextLocal: string) => {
    startTransition(() => {
      router.replace(`/${nextLocal}`)
    })
    // setActiveButton(nextLocal);
  }

  useEffect(() => {
    setActiveButton(localActive)
  }, [localActive])

  return (
    <div>
      <button
        disabled={isPending}
        value="uk"
        onClick={() => changeLanguageHandler('uk')}
      >
        UA
      </button>
      <span>/</span>
      <button disabled={isPending} onClick={() => changeLanguageHandler('en')}>
        EN
      </button>
    </div>
  )
}

export default LangBtn
