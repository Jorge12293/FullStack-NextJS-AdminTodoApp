/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailus.io'
            },
            {
                protocol: 'https',
                hostname: 'ampire.tailus.io'
            },
            {
                protocol: 'https',
                hostname: 'www.w3.org'
            }
        ]
    }
};

export default nextConfig;
