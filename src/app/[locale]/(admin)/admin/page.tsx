import { useTranslations } from "next-intl";

export default function Admin() {
  const t = useTranslations("Admin");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
