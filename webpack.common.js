const webpack = require("webpack");


module.exports = {
    entry: {
        main: "./js/payment.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
}