import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

<<<<<<< HEAD
const locales = ["uk", "en"];
=======
const locales = ["uk",];
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../localization/${locale}.json`)).default,
  };
});
