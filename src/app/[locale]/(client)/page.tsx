import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";

import Hero from "@/components/Hero/Hero";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Еко відпочинок за містом На селі у дідуся",
  description:
    "Еко готель для відпочинку на природі в селі Олешня Чернігівської області, заміський комплекс за Києвом в лісі серед Блакитних озер",
  other: {
    "google-site-verification": "Yy2eWiERz4G340GcJ4J0ebWXu0GNzOaU-AQJVCYkv1s"
  }
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AskGrandpa />
    </>
  );
}
