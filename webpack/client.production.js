const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    name: 'client',
    target: 'web',
    entry: [
        join(__dirname, '../src/client/index')
    ],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.styl$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
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
        new ExtractTextPlugin('app.bundle.css'),
        new StatsWebpackPlugin('stats.json')
    ]
});
