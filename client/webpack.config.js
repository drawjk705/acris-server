const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
require('dotenv').config('../../.env');

const isDev = process.env.IS_DEV;

const getConfig = (overrides = {}) => ({
    mode: isDev ? 'development' : 'production',
    target: 'node',
    entry: './src/ssr/server.tsx',
    plugins: [new CleanWebpackPlugin()],
    devServer: {
        contentBase: './build',
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /__test__/, /__stories__/],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    externals: [webpackNodeExternals()],
    ...overrides,
});

const serverConfig = getConfig();
const clientConfig = getConfig({
    entry: './src/index.tsx',
    output: {
        filename: '[name].client_bundle.js',
        path: path.resolve(__dirname, './build/public'),
        publicPath: './',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    externals: undefined,
});

module.exports = [serverConfig, clientConfig];
