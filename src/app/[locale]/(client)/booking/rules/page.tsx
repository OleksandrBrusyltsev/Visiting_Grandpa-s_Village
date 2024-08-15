import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Rules from '@/components/Rules/Rules';

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Breadcrumbs');

  return (
    <div>
      <Rules/>
    </div>
  )
}