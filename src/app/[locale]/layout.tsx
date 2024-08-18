<<<<<<< HEAD
import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";
=======
import { MatchMediaProvider } from "@/context/MatchMediaContext";
import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01

export function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

<<<<<<< HEAD
export default function LocaleLayout({
=======
export default async function LocaleLayout({
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
<<<<<<< HEAD
  return (
    <NextIntlClientProvider locale={locale}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
=======
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MatchMediaProvider>
            {children}
          </MatchMediaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
  );
}
