import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getData } from "@/actions/getData";

export async function generatePageMetadata({
  params,
}: {
  params: { house: string; locale: string };
}): Promise<Metadata> {
  const { house } = params;
  const houseItem = await getData<HouseItem[]>("houses", house);

  if (!houseItem.length) notFound();

  const houseTitle = houseItem[0].title[0].text;

  return {
    title: `Еко-будинок ${houseTitle} | На селі у Дідуся`,
    description: `Еко-будинок ${houseTitle} під Києвом в Чернігові для затишного відпочинку в лісі за містом, комфортні кімнати еко-готелю На селі у Дідуся`,
  };
}
