import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import { unstable_setRequestLocale } from "next-intl/server";

import Houses from "@/components/Houses/Houses";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Проживання в затишних хатинках та теремках Блакитних озер",
  description:
    "Обирайте проживання у затишних хатинках, теремках та горницях зі зручностями біля Голубих озер Чернігівської області.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: { locale: string } };

export default async function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const items = await getData<HouseItem[]>("houses");

  return <>
    <Houses items={items} />
    <AskGrandpa />
  </>
}
