<<<<<<< HEAD
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";
import AskGrandpa from "../../../components/AskGrandpa/AskGrandpa";
import BookingComponent from "@/components/BookingComponent/BookingComponent";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main>
      <BookingComponent />
      <WelcomeBlock />
      <AskGrandpa />
=======
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";
// import AskGrandpa from "../../../components/AskGrandpa/AskGrandpa";

import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: 'Відпочинок на Блакитних озерах Чернігівщини | "На селі у Дідуся"',
  description:
    'Відпочинок на Блакитних озерах Чернігівщини | "На селі у Дідуся"',
};

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return (
    <main>
      <Hero />
      <WelcomeBlock text={t("welcomeBlock")} />
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
    </main>
  );
}
