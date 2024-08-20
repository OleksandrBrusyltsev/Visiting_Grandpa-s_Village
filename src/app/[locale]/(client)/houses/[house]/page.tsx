import { Metadata } from "next";

import House from "@/components/House/House";
import { getData } from "@/actions/getData";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";

export const metadata: Metadata = {
  title: "Проживання в затишних хатинках та теремках Блакитних озер",
  description:
    "Обирайте проживання у затишних хатинках, теремках та горницях зі зручностями біля Голубих озер Чернігівської області.",
};

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const items = await getData<HouseItem[]>('houses');
  return items.map((item) => ({locale, house: item.name }));
}

type Props = { params: { house: string, locale: string } };

export default async function Page({ params }: Props) {
  const { house, locale } = params;
  unstable_setRequestLocale(locale);
  const houseItem = await getData<HouseItem[]>("houses", house);

  if(!houseItem.length) notFound();
  
  return (
    <>
      <div className="container">
        <House item={houseItem[0]}/>
      </div>
      <AskGrandpa />
    </>
  );
}
