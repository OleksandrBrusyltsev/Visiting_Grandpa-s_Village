import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            destination: "/:locale/contacts",
            source: "/:locale/contacts",
          },
        ];
    }
}
export default withNextIntl(nextConfig);


