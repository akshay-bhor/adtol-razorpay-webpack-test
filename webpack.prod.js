const { default: merge } = require("webpack-merge");
const common = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
});