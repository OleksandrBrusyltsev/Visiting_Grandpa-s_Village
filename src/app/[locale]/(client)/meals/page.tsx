import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

import { getData } from "@/actions/getData";
import Meals from "@/components/Meals/Meals";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Здорове харчування в еко стилі | На селі у Дідуся",
  description:
    "Насолоджуйтесь домашніми українськими стравами та їжею в еко стилі з видом на природу, літня кухня та мангали біля озера",
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

  const items = await getData<MealsItem[]>("meals");

  return (
    <>
      <Meals items={items} />;
      <AskGrandpa />
    </>
  );
}
