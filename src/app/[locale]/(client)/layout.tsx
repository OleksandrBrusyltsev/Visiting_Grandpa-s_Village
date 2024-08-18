import { unstable_setRequestLocale } from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "@/components/Header/Navigation";
import { locales } from "@/data/locales";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

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
