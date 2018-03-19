const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const PROJECT_FOLDER = path.join(__dirname, '.');
const NODE_MODULES = path.join(PROJECT_FOLDER, 'node_modules');
const SRC_FOLDER = path.join(PROJECT_FOLDER, 'src');
const BUILD_FOLDER = path.join(PROJECT_FOLDER, 'dist');

module.exports = {
    entry: {
        // app: ['babel-polyfill', path.join(SRC_FOLDER, 'js', 'mdRainbow.js')]
        app: path.join(SRC_FOLDER, 'index.js')
    },
    output: {
        path: BUILD_FOLDER,
        filename: 'mdRainbow.js'
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        }),
        // new htmlWebpackPlugin({
        //     template: path.join(SRC_FOLDER, 'index.html')
        // }),
        new extractTextPlugin('mdRainbow.css')
    ],
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    SRC_FOLDER
                ],
                loaders: ['ng-annotate-loader', {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]//, 'source-map-loader']  // Uncomment for source map support
            },
            {
                test: /\.html$/,
                include: [
                    SRC_FOLDER
                ],
                loader: 'html-loader'
            },
            {
                test: /\.less/,
                include: [
                    SRC_FOLDER
                ],
                // loader: 'less-loader', options: {
                //     strictMath: true
                // }
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    // use: 'less-loader'
                    use: 'css-loader!autoprefixer-loader!less-loader'
                })
            },
            {
                test: /\.css$/,
                include: [
                    SRC_FOLDER,
                    // path.resolve(NODE_MODULES, 'angular-material/'),
                    // path.resolve(NODE_MODULES, 'material-design-icons', 'iconfont')
                ],
                loader: 'style-loader!css-loader!autoprefixer-loader'
            }
        ]
    }
};
