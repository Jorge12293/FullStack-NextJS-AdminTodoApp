/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ampire.tailus.io'
            },
            {
                protocol: 'https',
                hostname: 'www.w3.org'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    }
};

export default nextConfig;
