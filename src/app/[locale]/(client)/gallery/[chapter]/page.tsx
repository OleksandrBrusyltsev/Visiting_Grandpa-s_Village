import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server';

import { getData } from "@/actions/getData";
import GalleryItemPage from '@/components/GalleryItemPage/GalleryItemPage';
import { notFound } from 'next/navigation';

type Props = {params: { chapter: string; locale: string }}

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const items = await getData<GalleryItem[]>('gallery');
  return items.map((gal) => ({ locale, chapter: gal.name }));
}


export default async function Page({params}: Props) {
  const {chapter, locale} = params;
  unstable_setRequestLocale(locale);
  const galleryItem = await getData<GalleryItem[]>('gallery', chapter);
  
  if(!galleryItem.length) notFound();

  return (
    <GalleryItemPage item={galleryItem[0]} />
  )
}
