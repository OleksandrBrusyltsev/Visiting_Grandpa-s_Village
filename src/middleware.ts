import createMiddleware from "next-intl/middleware";

export default createMiddleware({
<<<<<<< HEAD
  locales: ["uk", "en"],
  defaultLocale: "uk",
});

export const config = {
  matcher: ["/", "/(en|uk)/:path*"],
=======
  locales: ["uk",],
  defaultLocale: "uk",
  // localeDetection: true,
});

export const config = {
  matcher: ["/", "/(uk)/:path*"],
>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
};
