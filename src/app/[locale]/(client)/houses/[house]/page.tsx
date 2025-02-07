import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import House from "@/components/House/House";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generateHouseMetadata } from "@/functions/generateHouseMetadata";
import { getHouses } from "@/actions/getHouses";

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const houses = await getHouses();
  return houses.filter(house => house.name && !house.house_type).map((house) => ({ locale, house: house.name }));
}

type Props = Readonly<{ params: { house: string; locale: string } }>;

export async function generateMetadata({ params }: Props) {
  return generateHouseMetadata({ params });
}

export default async function Page({ params }: Props) {
  const { house, locale } = params;
  unstable_setRequestLocale(locale);

  const houses = await getHouses();

  const houseItem = houses.filter((item) => item.name === house);

  const houseRooms = houses.filter((house) => house.house_type === houseItem[0].name);

  if (!houseItem.length) notFound();

  return (
    <>
      <div className="container">
        <House item={houseItem[0]} rooms={houseRooms} />
      </div>
      <AskGrandpa />
    </>
  );
}
