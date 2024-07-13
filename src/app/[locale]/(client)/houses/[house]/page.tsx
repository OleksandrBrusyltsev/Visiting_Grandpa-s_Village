import House from "@/components/House/House";

type Props = { params: { house: string } };

export default function Page({ params }: Props) {
  const { house } = params;

  return (
    <House id={house} />
  );
}
