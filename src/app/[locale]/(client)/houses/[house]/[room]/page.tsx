import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import House from "@/components/House/House";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generateHouseMetadata } from "@/functions/generateHouseMetadata";
import { getHouses } from "@/actions/getHouses";

type Props = Readonly<{ params: { house: string; room: string; locale: string } }>;

export async function generateMetadata({ params }: Props) {
  return generateHouseMetadata({ params });
}

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const houses = await getHouses();

  const rooms = houses.filter(item => item.name && item.house_type);
  const routes = rooms.reduce((accu, cur) => {
    accu.push({ locale, house: cur.house_type!, room: cur.name })
    return accu
  }, [] as { locale: string; house: string; room: string }[])
  return routes;
}

export default async function Page({ params }: Props) {
  const { room, locale } = params;
  unstable_setRequestLocale(locale);

  const roomItem = (await getHouses()).filter((house) => house.name === room);

  if (!roomItem.length) notFound();

  return (
    <>
      <div className="container">
        <House item={roomItem[0]} rooms={[]} />
      </div>
      <AskGrandpa />
    </>
  );
}
