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
    </main>
  );
}
