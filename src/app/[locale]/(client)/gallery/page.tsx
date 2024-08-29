import type { Metadata } from "next";

import { getData } from "@/actions/getData";
import Gallery from "@/components/Gallery/Gallery";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Фото галерея спогадів | На селі у Дідуся",
  description:
    "Розгляньте неймовірні фото наших гостей, збережені щирі емоції радості та щастя в галереї еко-садиби. Станьте свідками краси природи та спокою",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {};

export default async function Page({}: Props) {
  const items = await getData<GalleryItem[]>("gallery");

  return (
    <>
      <Gallery items={items} />;
      <AskGrandpa />
    </>
  );
}
