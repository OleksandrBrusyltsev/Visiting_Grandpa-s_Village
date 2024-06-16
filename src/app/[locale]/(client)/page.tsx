import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";
import AskGrandpa from "../../../components/AskGrandpa/AskGrandpa";
import BookingComponent from "@/components/BookingComponent/BookingComponent";
import Hero from "@/components/Hero/Hero";

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
      {/* <div className="container"
      style={{
        // display: 'flex',
        // justifyContent: 'center',
        // margin: '80px auto 120px'
      }}> */}
        <Hero />
        {/* <BookingComponent /> */}
      {/* </div> */}
      <WelcomeBlock text={t("welcomeBlock")} />
      <AskGrandpa />
    </main>
  );
}
