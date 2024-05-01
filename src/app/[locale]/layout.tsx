// import { ReactNode } from "react";

// type Props = {
//   children: ReactNode;
// };

// export default function RootLayout({ children }: Props) {
//   return children;
// }
import "../globals.scss";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

async function getMessages(locale: string) {
  try {
    return (await import(`../../../localization/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["uk", "en"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
  );
}
