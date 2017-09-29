const merge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const join = require('path').join;

module.exports = merge(common, {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    entry: [
        join(__dirname, '../src/client/index')
    ],
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.styl$/,
            exclude: /node_modules/,
            use: ExtractCssChunks.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'stylus-loader'
                }]
            })
        }]
    },
    plugins: [
        new ExtractCssChunks(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new StatsWebpackPlugin('stats.json'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ServiceWorkerWebpackPlugin({
            entry: join(__dirname, '../src/client/pwa/service-worker.js')
        })
    ]
});
