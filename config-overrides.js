// config-overrides.js

const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        fallback: {
            ...config.resolve.fallback,
            buffer: require.resolve('buffer/'),
            process: require.resolve('process/browser.js'), // Явно указано расширение .js
        },
        extensions: ['.js', '.jsx', '.json'], // Добавление допустимых расширений
    };
    config.resolve.alias = {
        ...config.resolve.alias,
        'process/browser': require.resolve('process/browser.js'),
    };

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser', // Прямое указание на модуль process
        }),
    ]);

    return config;
};
