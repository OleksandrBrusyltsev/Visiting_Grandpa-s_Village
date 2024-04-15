import { useTranslations } from "next-intl";
import WelcomeBlock from "../../components/WelcomeBlock/WelcomeBlock";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main>
      <h1>{t("title")}</h1>
      <WelcomeBlock />
    </main>
  );
}
