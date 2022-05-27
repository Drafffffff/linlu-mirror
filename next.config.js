/** @type {import('next').NextConfig} */
const path = require('path');
const withVideos = require('next-videos')
const nextConfig = withVideos({
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.mp3$/,
            use: {
                loader: 'url-loader',
            },
        });
        return config;
    },
})

module.exports = nextConfig
