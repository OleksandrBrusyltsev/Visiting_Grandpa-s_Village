import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

// import { HeaderUrls } from "../../../../types/header";
import ContactsComponent from "../../../../components/ContactsComponent/ContactsComponent";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title:
    "Контакти та інформація про відпочинок | «На селі у Дідуся» | Блакитні Озера | готель",
  description:
    "Запрошуємо на незабутній відпочинок на унікальних Блакитних озерах Чернігівської області, в еко-садибі «На селі у Дідуся», с. Олешня.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// const urls: HeaderUrls = {
//   en: {
//     pathList: ["contacts"],
//   },
//   uk: {
//     pathList: ["contacts"],
//   },
// };

// export async function generateStaticParams({
//   params: { locale },
// }: {
//   params: { locale: string };
// }) {
//   return (urls[locale]?.pathList || []).map((item) => ({ slug: item }));
// }

export default async function ContactsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <ContactsComponent />
      <AskGrandpa />
    </>
  );
}
