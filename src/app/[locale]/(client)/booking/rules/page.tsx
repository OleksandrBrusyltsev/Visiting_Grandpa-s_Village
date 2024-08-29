import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import Rules from "@/components/Rules/Rules";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Правила проживання в еко-садибі | На селі у Дідуся",
  description:
    "Правила проживання, бронювання, оплати та скасування замовлення в еко-садибі «На селі у Дідуся».",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Breadcrumbs");

  return (
    <>
      <Rules />
      <AskGrandpa />
    </>
  );
}
