import { unstable_setRequestLocale } from "next-intl/server";

import Visit from "@/components/Visit/Visit";
import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "booking");
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Page({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className="container">
        <Visit />
      </div>
      <AskGrandpa />
    </>
  );
}
