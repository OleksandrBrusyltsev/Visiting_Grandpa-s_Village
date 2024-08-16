import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

import Navigation from "@/components/Header/Navigation";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navigation />
      <Breadcrumbs />
        {children}
      <Footer />
    </>
  );
}
