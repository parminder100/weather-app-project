/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
    reactStrictMode: false,
    // basePath: '/weather360',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
          port: "",
          pathname: "**",
        },
      ],
    },
    webpack: (config, { isServer }) => {
        // Use jQuery in both the client and server.
        config.plugins.push(
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
          })
        );
        // config.module.rules.push({
        //   test: /\.html$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'html-loader',
        //   },
        // });
        if (!isServer) {
          // Prevent Mismatched Versions warning in the browser console.
          config.resolve.alias['@/jQuery'] = 'jquery';
        }
        return config;
    },
}

module.exports = nextConfig