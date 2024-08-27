import House from "@/components/House/House";
import { getData } from "@/actions/getData";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

export async function generateMetadata({ params }: Props) {
  return generatePageMetadata({ params });
}

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const items = await getData<HouseItem[]>("houses");
  const housesWithRooms = items.filter((item) => item.rooms.length > 0);
  const routes = housesWithRooms.reduce((accu, cur) => {
    const house = cur.name;
    cur?.rooms.forEach((room) => accu.push({ locale, house, room: room.name }));
    return accu;
  }, [] as { locale: string; house: string; room: string }[]);
  // console.log(routes);
  return routes;
}

type Props = { params: { house: string; room: string; locale: string } };

export default async function Page({ params }: Props) {
  const { room, house, locale } = params;
  unstable_setRequestLocale(locale);
  const isRoom = "room" in params;

  const houseItem = await getData<HouseItem[]>("houses", house);
  if (!houseItem.length) notFound();

  const roomItem = houseItem[0]?.rooms.filter((item) => item.name === room);
  if (!roomItem.length) notFound();

  return (
    <>
      <div className="container">
        <House item={roomItem[0]} isRoom={isRoom} />
      </div>
      <AskGrandpa />
    </>
  );
}
