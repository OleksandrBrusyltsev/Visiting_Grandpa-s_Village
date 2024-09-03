import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

// import { HeaderUrls } from "../../../../types/header";
import ContactsComponent from "../../../../components/ContactsComponent/ContactsComponent";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";

export const metadata: Metadata = {
  title: "Контакти еко-садиби | На селі у Дідуся",
  description:
    "Зв'яжіться з нами для бронювання будиночків в еко-садибі На селі у дідуся серед Блакитних озер Чернігівської області в селі Олешня чи отримання додаткової інформації, плануйте відпочинок завчасно!",
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
