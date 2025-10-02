import { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/numerica',
    assetPrefix: '/numerica/',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig