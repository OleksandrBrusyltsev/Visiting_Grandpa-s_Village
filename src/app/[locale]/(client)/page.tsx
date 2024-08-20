import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";

import Hero from "@/components/Hero/Hero";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";

export const metadata: Metadata = {
  title: 'Відпочинок на Блакитних озерах Чернігівщини | "На селі у Дідуся"',
  description:
    'Відпочинок на Блакитних озерах Чернігівщини | "На селі у Дідуся"',
};

// export async function generateStaticParams() {
//   return ["uk", "en"].map((locale) => ({ locale }));
// }

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
      <AskGrandpa />
    </main>
  );
}
