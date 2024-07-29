import type { Metadata } from "next";
import { getData } from "@/actions/getData";
import Houses from "@/components/Houses/Houses";

export const metadata: Metadata = {
  title: "Проживання в затишних хатинках та теремках Блакитних озер",
  description:
    "Обирайте проживання у затишних хатинках, теремках та горницях зі зручностями біля Голубих озер Чернігівської області.",
};

export default async function Page() {
  const items = await getData<HouseItem[]>("houses");

  return <Houses items={items} />;
}
