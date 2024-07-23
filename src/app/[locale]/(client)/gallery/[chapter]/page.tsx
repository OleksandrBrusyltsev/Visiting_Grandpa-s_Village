import React from 'react'

import { getData } from "@/actions/getData";
import GalleryItemPage from '@/components/GalleryItemPage/GalleryItemPage';

type Props = {params: { chapter: string }}

export default async function Page({params}: Props) {
  const {chapter} = params;
  const items = await getData<GalleryItem[]>('gallery', chapter);

  return (
    <GalleryItemPage items={items} />
  )
}
