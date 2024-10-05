"use server";
import { gallery } from "@/data/gallery/gallery.js";
import { houses } from "@/data/houses";
import { meals } from "@/data/meals";
import { entertainments } from "@/data/entertainments";
import { contacts } from "@/data/contacts";

export const getData = async <T>(url: string, slug?: string): Promise<T> => {
  // const resp = await fetch(url);
  // try {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   const data = await resp.json();

  //type guards
  function isGalleryItemArray(
    arr: GalleryItem[] | HouseItem[] | MealsItem[] | EntertainmentItem[]
  ): arr is GalleryItem[] {
      return (
          arr.length > 0 && 'photo_urls' in arr[0]
      );
  }

  function isHouseItemArray(
      arr: GalleryItem[] | HouseItem[] | MealsItem[] | EntertainmentItem[],
  ): arr is HouseItem[] {
      return (
          arr.length > 0 && 'max_adults' in arr[0]
      );
  }

  // tmp fake data
  const data: {
    gallery: GalleryItem[];
    houses: HouseItem[];
    meals: MealsItem[];
    entertainments: EntertainmentItem[];
    contacts: ContactItem;
  } = {
    gallery,
    houses,
    meals,
    entertainments,
    contacts
  };

  const currentData = data[url as keyof typeof data];
  
  if (slug && Array.isArray(currentData)) {
    if (isGalleryItemArray(currentData) || isHouseItemArray(currentData)) {
      const result = currentData.filter((item) => item.name === slug);
      return Promise.resolve(result as T);
    }
  }
  return Promise.resolve(currentData as T);
};
