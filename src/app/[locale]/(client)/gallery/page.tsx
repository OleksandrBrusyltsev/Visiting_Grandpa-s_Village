import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import Gallery from "@/components/Gallery/Gallery";

export const metadata: Metadata = {
  title:
    "Контакти та інформація про відпочинок | «На селі у Дідуся» | Блакитні Озера | готель",
  description:
    "Запрошуємо на незабутній відпочинок на унікальних Блакитних озерах Чернігівської області, в еко-садибі «На селі у Дідуся», с. Олешня.",
};

type Props = {};

export default async function Page({}: Props) {
  const items = await getData<GalleryItem[]>("gallery");

  return <Gallery items={items} />;
}
