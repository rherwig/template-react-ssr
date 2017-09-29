const merge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const join = require('path').join;
const nodeExternals = require('../scripts/node-externals');

module.exports = merge(common, {
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        join(__dirname, '../src/server/index')
    ],
    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.styl$/,
            exclude: /node_modules/,
            use: [{
                loader: 'css-loader/locals',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }, {
                loader: 'stylus-loader'
            }]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: [':src', ':href'],
                    minimize: true
                }
            }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: join(__dirname, '../package.json'),
            to: join(__dirname, '../public/package.json')
        }]),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});
