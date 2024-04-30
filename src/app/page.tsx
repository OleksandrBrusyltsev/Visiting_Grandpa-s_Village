import Header from "@/components/Header/Header";
import BookingComponent from "@/components/BookingComponent/BookingComponent";
import WelcomeBlock from "@/components/WelcomeBlock/WelcomeBlock";

export default function Home() {
  return (
    <main>
      <Header />
      <BookingComponent />
      <WelcomeBlock />
    </main>
  );
}
