import { useTranslations } from "next-intl";
import WelcomeBlock from "../../../components/WelcomeBlock/WelcomeBlock";
import AskGrandpa from "../../../components/AskGrandpa/AskGrandpa";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main>
      <WelcomeBlock />
      <AskGrandpa />
    </main>
  );
}
