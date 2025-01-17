import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import Meals from "@/components/Meals/Meals";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";
import { getMeals } from "@/actions/getMeals";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "meals");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const items = await getMeals();

  return (
    <>
      <Meals items={items} />;
      <AskGrandpa />
    </>
  );
}
