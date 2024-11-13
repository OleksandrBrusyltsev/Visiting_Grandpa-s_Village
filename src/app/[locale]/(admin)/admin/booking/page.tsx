import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import AdminCalendar from "@/components/Admin/Booking/components/AdminCalendar/AdminCalendar";

export async function generateStaticParams() {
    return ["uk", "en"].map((locale) => ({ locale }));
}

export default function Admin({
    params: { locale },
}: {
    params: { locale: string };
}) {
    // Установка локали для запроса
    unstable_setRequestLocale(locale);

    // Определяем переводчик для ключа "Admin"
    const t = useTranslations("Admin" as any); // Добавили "as any" для обхода проблемы с типизацией

    return (
        <main>
            <h1>{t("title" as any)}</h1>

            <AdminCalendar/>
        </main>
    );
}
