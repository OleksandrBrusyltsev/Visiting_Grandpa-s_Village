import { unstable_setRequestLocale } from "next-intl/server";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navigation from "@/components/Header/Navigation";
import { locales } from "@/data/locales";
import Toaster from "@/components/ui/Toaster/Toaster";
import { toasters } from "@/data/advertisementToaster";
import { getPromoData } from "@/functions/tosterHelpers";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const dataToasters = await Promise.resolve(toasters);
  const serverTime = Date.now();
  const curPromo = getPromoData(dataToasters, serverTime, locale);

  return (
    <>
      <header>
        <Header />
        <Navigation />
      </header>
      <Breadcrumbs />
      <main>{children}</main>
      <Footer />
      <Toaster
        promoText={curPromo.promoText}
        isPromoActive={curPromo.isPromoActive}
        timeout={curPromo.timeout}
      />
    </>
  );
}
