import { ReactNode } from "react";
import type { Metadata } from "next";
import Footer from "../../components/Footer/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function HomePageLayout({
  children,
  params: { locale },
}: Props) {
  return (
    <html lang={locale}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
