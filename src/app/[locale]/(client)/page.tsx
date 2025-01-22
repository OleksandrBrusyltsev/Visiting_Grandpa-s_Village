import { unstable_setRequestLocale } from "next-intl/server";

import Hero from "@/components/Home/Home";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";
import { getHome } from "@/actions/getHome";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "home");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const homeData = await getHome();

  return (
    <>
      <Hero data={homeData} />
      <AskGrandpa />
    </>
  );
}
