"use server"
import {gallery} from '@/data/gallery/gallery.js'

export const getGallery = async (): Promise<GalleryItem[]> => {
  // const resp = await fetch('http://someurl');
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();
  //   return data;
  // } catch (err) {
  //   console.error(err);
  // }
  return new Promise(res => setTimeout(() => res(gallery), 100));
}