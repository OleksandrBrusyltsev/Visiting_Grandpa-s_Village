import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import { unstable_setRequestLocale } from "next-intl/server";

import Houses from "@/components/Houses/Houses";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Еко комплекс для відпочинку за Києвом | На селі у Дідуся",
  description:
    "Еко комплекс на Чернігівщині в дерев'яних будиночках, зручні та затишні апартаменти для сімейного відпочинку чи наодинці",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: { locale: string } };

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
