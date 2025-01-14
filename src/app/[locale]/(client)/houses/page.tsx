import { unstable_setRequestLocale } from "next-intl/server";

import Houses from "@/components/Houses/Houses";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";
import { getData } from "@/actions/getData";

import { locales } from "@/data/locales";

type Props = Readonly<{ params: { locale: string } }>;

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "houses");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const items = await getData<HouseItem[]>("houses");

  return (
    <>
      <Houses items={items} />
      <AskGrandpa />
    </>
  );
}
