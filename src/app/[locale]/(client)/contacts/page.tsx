import { headerUrls } from "../../../../types/header";

const urls: headerUrls = {
  en: {
    pathList: ["contacts"],
  },
  uk: {
    pathList: ["contacts"],
  },
};

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (urls[locale]?.pathList || []).map((item) => ({ slug: item }));
}

export default async function ContactsPage() {
  return <>ContactsPage</>;
}
