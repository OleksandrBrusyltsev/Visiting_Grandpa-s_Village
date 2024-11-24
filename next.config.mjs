import createNextIntlPlugin from 'next-intl/plugin';
import dotenv from 'dotenv';

dotenv.config();

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'grandpas-village.fly.dev',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        NEXT_PUBLIC_MAP_ADI: process.env.NEXT_PUBLIC_MAP_ADI,
        SERV_URL: process.env.SERV_URL,
    },
};

export default withNextIntl(nextConfig);
// test
