import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Entertainment from "@/components/Entertainment/Entertainment";
import { getData } from "@/actions/getData";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Розваги на природі в базі відпочинку | На селі у Дідуся",
  description:
    "Насолоджуйся магією тиші бази відпочинку серед озер в колі родини чи друзів, незабутній релакс та атмосфера єднання з природою",
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
  const items = await getData<EntertainmentItem[]>("entertainments");
  return (
    <>
      <Entertainment items={items} />
      <AskGrandpa />
    </>
  );
}
