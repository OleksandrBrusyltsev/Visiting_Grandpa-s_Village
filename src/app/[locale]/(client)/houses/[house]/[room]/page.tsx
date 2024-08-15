import House from "@/components/House/House";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проживання в затишних хатинках та теремках Блакитних озер",
  description:
    "Обирайте проживання у затишних хатинках, теремках та горницях зі зручностями біля Голубих озер Чернігівської області.",
};

type Props = { params: { room: string } };

export default function Page({ params }: Props) {
  const { room } = params;
  const isRoom = "room" in params;
  
  return (
    <div className="container">
      <House id={room} isRoom={isRoom}/>
    </div>
  );
}
