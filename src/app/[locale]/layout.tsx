import { MatchMediaProvider } from "@/context/MatchMediaContext";
import "../globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

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
  );
}
