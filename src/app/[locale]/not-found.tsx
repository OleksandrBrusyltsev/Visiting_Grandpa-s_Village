import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NotFound from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінка не знайдена - 404",
  description:
    "Сторінка, яку ви шукаєте, не знайдена. Поверніться на головну сторінку або скористайтеся навігацією.",
};

export default function NotFoundPage() {
  return   (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <Header />
      <NotFound />
      <Footer />
    </div>
  )
}
