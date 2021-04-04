const { default: merge } = require("webpack-merge");
const common = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: "[name].bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
});