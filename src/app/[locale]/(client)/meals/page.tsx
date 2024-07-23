import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import Meals from "@/components/Meals/Meals";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title:
    "Харчування - Відпочинок на блакитних озерах (с. Олешня, Чернігівська область)",
  description:
    "Еко-садиба «На селі у Дідуся!!! » ОЛЕШНЯ, БЛАКИТНІ ОЗЕРА Харчування за попереднім замовленням по меню.",
};

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const items = await getData<MealsItem[]>("meals");

  return <Meals items={items} />;
}
