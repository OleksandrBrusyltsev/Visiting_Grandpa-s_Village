import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  // localeDetection: true,
});

export const config = {
  matcher: ["/", "/(en|uk)/:path*"],
};
