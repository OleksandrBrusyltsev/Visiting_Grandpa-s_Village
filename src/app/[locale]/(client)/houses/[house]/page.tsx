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
  return items.map((item) => ({locale, house: item.name }));
}

type Props = { params: { house: string, room?: string; locale: string } };

export default function Page({ params }: Props) {
  const { house, locale } = params;
  unstable_setRequestLocale(locale);
  
  return (
    <div className="container">
      <House id={house}/>
    </div>
  );
}
