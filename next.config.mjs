import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";

dotenv.config();

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    MAP_ADI: process.env.MAP_ADI,
  },
};

export default withNextIntl(nextConfig);
