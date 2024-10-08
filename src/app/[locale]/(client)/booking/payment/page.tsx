import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";
import { generatePageMetadata } from "@/functions/generatePageMetadata";

import { locales } from "@/data/locales";

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  return generatePageMetadata(params.locale, "payment");
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
      <div className="container">
        <h1
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Сторінка {t("payment")}
        </h1>
        <div>
          <Link href={`/${locale}/booking/rules`}>{t("rules")}</Link>
        </div>
      </div>
      <AskGrandpa />
    </>
  );
}
