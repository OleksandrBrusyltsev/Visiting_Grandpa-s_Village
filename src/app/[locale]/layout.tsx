import { MatchMediaProvider } from "@/context/MatchMediaContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { StoreProvider } from "@/stores/store-provider";

import { locales } from "@/data/locales";
import "../globals.scss";

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
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <MatchMediaProvider>{children}</MatchMediaProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
