import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";
import AskGrandpa from "../../../components/AskGrandpa/AskGrandpa";
import BookingComponent from "@/components/BookingComponent/BookingComponent";

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
      <BookingComponent />
      <WelcomeBlock text={t("welcomeBlock")} />
      <AskGrandpa />
    </main>
  );
}