import Image from "next/image";
import React from "react";

const image = "https://res.cloudinary.com/dzbm3urzv/image/upload/v1722879338/qoid2s8gyt3zamybo66p.png";
export const CustomMarker = () => (
  <Image
    src={image}
    alt={"GrandPa"}
    width={50}
    height={65}

  />
);
