import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import Entertainment from "@/components/Entertainment/Entertainment";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";
import { getEntertainments } from "@/actions/getEntertainments";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "entertainment");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const items = await getEntertainments();

  return (
    <>
      <Entertainment items={items} />
      <AskGrandpa />
    </>
  );
}
