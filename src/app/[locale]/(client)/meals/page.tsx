import { getData } from '@/actions/getData';
import Meals from '@/components/Meals/Meals';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const items = await getData<MealsItem[]>('meals');
  return (
    <div className='container'>
      <Meals items={items}/>
    </div>
  )
}