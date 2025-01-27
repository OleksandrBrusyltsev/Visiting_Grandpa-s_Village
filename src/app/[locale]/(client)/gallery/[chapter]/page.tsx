import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import GalleryItemPage from "@/components/GalleryItemPage/GalleryItemPage";
import { notFound } from "next/navigation";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generateGalleryMetadata } from "@/functions/generateGalleryMetadata";
import { getGallery } from "@/actions/getGallery";

type Props = Readonly<{ params: { chapter: string; locale: string } }>;

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  //сортировка нужна для удаления обектов с пустым названием name, которые используются для хранения hero блока в галерее
  const items = (await getGallery()).filter(gal => gal.name);
  return items.map((gal) => ({ locale, chapter: gal.name }));
}

export async function generateMetadata({ params }: Props) {
  return generateGalleryMetadata({ params });
}

export default async function Page({ params }: Props) {
  const { chapter, locale } = params;
  unstable_setRequestLocale(locale);
  const gallery = await getGallery();
  const galleryItem = gallery.filter((item) => item.name === chapter);
  if (!galleryItem.length) notFound();

  return (
    <>
      <GalleryItemPage item={galleryItem[0]} />
      <AskGrandpa />
    </>
  );
}
