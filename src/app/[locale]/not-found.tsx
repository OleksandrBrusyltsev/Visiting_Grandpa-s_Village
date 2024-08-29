import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NotFound from "../../components/NotFound/NotFound";

export default function NotFoundPage() {
  return (
    <html lang="uk">
      <head>
        <title>Сторінка не знайдена - 404</title>
        <meta
          name="description"
          content="Сторінка, яку ви шукаєте, не знайдена. Поверніться на головну сторінку
          або скористайтеся навігацією"
        />
      </head>
      <body>
        <header>
          <Header />
        </header>
        <NotFound />
        <Footer />
      </body>
    </html>
  );
}
