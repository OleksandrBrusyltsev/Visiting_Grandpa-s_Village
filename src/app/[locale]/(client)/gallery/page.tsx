import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import { getGallery } from "@/actions/getGallery";
import Gallery from "@/components/Gallery/Gallery";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "gallery");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const items = await getGallery();

  return (
    <>
      <Gallery items={items} />;
      <AskGrandpa />
    </>
  );
}
