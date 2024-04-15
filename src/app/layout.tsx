import { ReactNode } from "react";
import "./globals.scss";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
