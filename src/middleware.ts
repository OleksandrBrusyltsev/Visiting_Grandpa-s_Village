import createMiddleware from "next-intl/middleware";

export default createMiddleware({

  locales: ["uk",],
  defaultLocale: "uk",
  // localeDetection: true,
});

export const config = {
  matcher: ["/", "/(uk)/:path*"],

};
