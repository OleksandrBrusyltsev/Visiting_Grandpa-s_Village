import { unstable_setRequestLocale } from "next-intl/server";

import Hero from "@/components/Hero/Hero";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "home");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AskGrandpa />
    </>
  );
}
