import React from 'react'

import { getData } from "@/actions/getData";
import GalleryItemPage from '@/components/GalleryItemPage/GalleryItemPage';

type Props = {params: { chapter: string }}

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const items = await getData<GalleryItem[]>('gallery');
  return items.map((gal) => ({ chapter: gal.name }));
}


export default async function Page({params}: Props) {
  const {chapter} = params;
  const items = await getData<GalleryItem[]>('gallery', chapter);

  return (
    <GalleryItemPage items={items} />
  )
}
