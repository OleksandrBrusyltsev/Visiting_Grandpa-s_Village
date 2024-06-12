import { MatchMediaProvider } from "@/context/MatchMediaContext";
import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <MatchMediaProvider>
        <html lang={locale}>
          <body>{children}</body>
        </html>
      </MatchMediaProvider>
    </NextIntlClientProvider>
  );
}
