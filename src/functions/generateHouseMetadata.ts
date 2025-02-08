import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getHouses } from "@/actions/getHouses";
import { metaData } from "@/data/meta";

export async function generateHouseMetadata({
  params,
}: {
  params: { house: string; locale: string };
}): Promise<Metadata> {
  const { house } = params;
  const houseItem = (await getHouses()).filter(item => item.name === house);

  if (!houseItem.length) notFound();

  const houseTitle = houseItem[0].long_title[params.locale as Language];
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
