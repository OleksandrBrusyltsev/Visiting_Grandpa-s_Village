import createMiddleware from "next-intl/middleware";
import { locales } from "./data/locales";

export default createMiddleware({
  locales,
  defaultLocale: "uk",
  // localeDetection: true,
});

export const config = {
  matcher: ["/", "/(en|uk)/:path*"],
};
