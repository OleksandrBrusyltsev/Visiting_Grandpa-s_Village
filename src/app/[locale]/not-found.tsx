import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NotFound from "@/components/NotFound/NotFound";

export default function NotFoundPage() {
  return   (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}}>
      <Header />
      <NotFound />
      <Footer />
    </div>
  )
}
