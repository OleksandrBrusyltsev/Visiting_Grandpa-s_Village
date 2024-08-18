import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import Visit from '@/components/Visit/Visit';
import AskGrandpa from '@/components/AskGrandpa/AskGrandpa';
import { locales } from '@/data/locales';

export const metadata: Metadata = {
  title:
    "Замовлення номерів - Відпочинок на блакитних озерах (с. Олешня, Чернігівська область)",
  description:
    "Еко-садиба «На селі у Дідуся!!! » ОЛЕШНЯ, БЛАКИТНІ ОЗЕРА замовлення номерів та попереднє бронювання.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className='container'>
        <Visit /> 
      </div>
      <AskGrandpa />
    </>
  )
}