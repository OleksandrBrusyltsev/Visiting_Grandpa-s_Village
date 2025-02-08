import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Header/Navigation";
import Toaster from "@/components/ui/Toaster/Toaster";

import { locales } from "@/data/locales";
import './layout.css';
import { getContacts } from "@/actions/getContacts";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/` ||
    `https://${process.env.VERCEL_BRANCH_URL}` ||
    `https://${process.env.VERCEL_URL}` ||
    `http://localhost:${process.env.PORT || 3000}`
  ),
  verification: {
    "google": "Yy2eWiERz4G340GcJ4J0ebWXu0GNzOaU-AQJVCYkv1s"
  },
  openGraph: {
    images: '/opengraph-image.jpg',
  }
};


export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const contacts = await getContacts();

  return (
    <>
      <header>
        <Header />
        <Navigation />
      </header>
      <Breadcrumbs />
      <main>{children}</main>
      <Footer contacts={contacts}/>
      <Toaster />
    </>
  );
}
