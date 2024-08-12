import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import Gallery from "@/components/Gallery/Gallery";


export const metadata: Metadata = {
  title: "Фото галерея Еко-садиби «На селі у Дідуся» | Блакитні Озера",
  description:
    "Розгляньте неймовірні фото Еко-садиби «На селі у Дідуся» поблизу чарівних Блакитних озер Чернігівської області. Почуйте красу природи та спокій в нашому закладі.",
};

type Props = {};

export default async function Page({}: Props) {
  const items = await getData<GalleryItem[]>("gallery");

  return <Gallery items={items} />;
}
