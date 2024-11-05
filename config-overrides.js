// config-overrides.js

const webpack = require("webpack");

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
    };
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);
    return config;
};
