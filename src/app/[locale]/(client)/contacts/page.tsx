import { unstable_setRequestLocale } from "next-intl/server";

import ContactsComponent from "@/components/ContactsComponent/ContactsComponent";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";
import { getContacts } from "@/actions/getContacts";

import { locales } from "@/data/locales";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "contacts");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactsPage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const contacts = await getContacts();

  return (
    <>
      <ContactsComponent contacts={contacts} />
      <AskGrandpa />
    </>
  );
}
