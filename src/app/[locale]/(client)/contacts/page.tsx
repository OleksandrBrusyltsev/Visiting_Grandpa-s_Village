import { HeaderUrls } from "../../../../types/header";
import ContactsComponent from "../../../../components/ContactsComponent/ContactsComponent";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";

const urls: HeaderUrls = {
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
  return (
    <>
      <ContactsComponent />
      <AskGrandpa />
    </>
  );
}
