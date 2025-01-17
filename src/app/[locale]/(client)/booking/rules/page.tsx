import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import Rules from "@/components/Rules/Rules";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { locales } from "@/data/locales";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

type Props = Readonly<{ params: { locale: string } }>

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "rules");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Breadcrumbs");

  return (
    <>
      <Rules />
      <AskGrandpa />
    </>
  );
}
