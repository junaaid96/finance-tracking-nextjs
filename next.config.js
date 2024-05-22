/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Match all HTTPS resources
            },
            {
                protocol: "http",
                hostname: "**", // Match all HTTP resources
            },
            {
                protocol: "https",
                hostname: "finance-tracking-drf.onrender.com",
            },
        ],
    },
};
