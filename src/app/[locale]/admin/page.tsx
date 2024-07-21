import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export async function generateStaticParams() {
  return ['uk', 'en'].map((locale) => ({ locale }))
}

export default function Admin({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Admin')

  return <main>admin</main>
}
