import type { Metadata } from "next";
import { HeaderUrls } from "../../../../types/header";
import ContactsComponent from "../../../../components/ContactsComponent/ContactsComponent";

export const metadata: Metadata = {
  title: "Фото галерея Еко-садиби «На селі у Дідуся» | Блакитні Озера",
  description:
    "Розгляньте неймовірні фото Еко-садиби «На селі у Дідуся» поблизу чарівних Блакитних озер Чернігівської області. Почуйте красу природи та спокій в нашому закладі.",
};

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
    </>
  );
}
