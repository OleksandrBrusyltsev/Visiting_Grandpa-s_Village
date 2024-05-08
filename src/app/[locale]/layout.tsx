import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <NextIntlClientProvider locale={locale}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
  );
}
