import House from "@/components/House/House";

type Props = { params: { house: string } };

export default function Page({ params }: Props) {
  const { house } = params;

  return (
    <div className="container">
      {/* <h1
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Сторінка будиночку: {house}
      </h1> */}
      <House id={house} />
    </div>
  );
}
