import createNextIntlPlugin from "next-intl/plugin";
<<<<<<< HEAD

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

=======
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
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_MAP_ADI: process.env.NEXT_PUBLIC_MAP_ADI,
  },
};

>>>>>>> 5a28b413a7eea541795a727d3e7a5a390ead1c01
export default withNextIntl(nextConfig);
