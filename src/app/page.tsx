import Header from "@/components/Header/Header";
import WelcomeBlock from "@/components/WelcomeBlock/WelcomeBlock";
import AskGrandpa from "../components/AskGrandpa/AskGrandpa";
import "../styles/globals.scss";

export default function Home() {
  return (
    <main>
      <Header />
      <WelcomeBlock />
      <AskGrandpa />
    </main>
  );
}
