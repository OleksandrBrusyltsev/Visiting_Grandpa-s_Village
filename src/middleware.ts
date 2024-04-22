import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uk", "en"],
  defaultLocale: "uk",
});

export const config = {
  matcher: ["/", "/(en|uk)/:path*"],
};
