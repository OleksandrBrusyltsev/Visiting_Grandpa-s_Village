import { Metadata } from "next";

import House from "@/components/House/House";
import { getData } from "@/actions/getData";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Проживання в затишних хатинках та теремках Блакитних озер",
  description:
    "Обирайте проживання у затишних хатинках, теремках та горницях зі зручностями біля Голубих озер Чернігівської області.",
};

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const items = await getData<HouseItem[]>('houses');
  const housesWithRooms = items.filter((item) => item.rooms.length > 0);
  const routes = housesWithRooms.reduce((accu, cur) => {
    const house = cur.name;
    cur.rooms.forEach((room) => accu.push({ locale, house, room: room.name }));
    return accu
  }, [] as {locale: string, house: string, room: string }[]);
  return routes;
}

type Props = { params: { house: string, room: string; locale: string } };

export default function Page({ params }: Props) {
  const { room, locale } = params;
  const isRoom = "room" in params;
  unstable_setRequestLocale(locale);
  
  return (
    <div className="container">
      <House id={room} isRoom={isRoom}/>
    </div>
  );
}
