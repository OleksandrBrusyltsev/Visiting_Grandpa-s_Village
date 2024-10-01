import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getData } from "@/actions/getData";
import { metaData } from "@/data/meta";

export async function generateHouseMetadata({
  params,
}: {
  params: { house: string; locale: string };
}): Promise<Metadata> {
  const { house } = params;
  const houseItem = await getData<HouseItem[]>("houses", house);

  if (!houseItem.length) notFound();

  const houseTitle = houseItem[0].long_title[params.locale as keyof typeof houseItem[0]['long_title']];
  const title =
      metaData['houseItem'].title[
          params.locale as keyof (typeof metaData)['houseItem']['title']
      ](houseTitle);
  const description =
      metaData['houseItem'].description[
          params.locale as keyof (typeof metaData)['houseItem']['description']
    ](houseTitle);
  
  return {
    title,
    description,
  };
}
