/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        // Use jQuery in both the client and server.
        config.plugins.push(
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
          })
        );
        if (!isServer) {
          // Prevent Mismatched Versions warning in the browser console.
          config.resolve.alias['@/jQuery'] = 'jquery';
        }
        return config;
    },
}

module.exports = nextConfig
