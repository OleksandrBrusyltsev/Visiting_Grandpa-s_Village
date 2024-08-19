import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from "next";
import Entertainment from '@/components/Entertainment/Entertainment';
import { getData } from '@/actions/getData';
import AskGrandpa from '@/components/AskGrandpa/AskGrandpa';
import { locales } from '@/data/locales';

export const metadata: Metadata = {
  title: "Програми відпочинку в еко-садибі - «На селі у Дідуся»",
  description:
    "Майстер-класи з народних промислів, кулінарні задоволення, командні квести та багато іншого чекають на вас в еко-садибі | «На селі у Дідуся». Біля Блакитних озер Чернігівської області.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const items = await getData<EntertainmentItem[]>('entertainments');
  return (
    <>
      <Entertainment items={items}/>
      <AskGrandpa />
    </>
  )
}