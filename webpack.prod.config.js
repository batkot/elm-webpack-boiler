// CONFIG
const distFolder = "dist";
const fileName = "app.js";
const indexPath = "src/static/index.html";

const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractSass = new extractTextWebpackPlugin({
    filename: '[name]-[contenthash].css'
});

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, distFolder),
        filename: fileName
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: extractSass.extract({
                use: [ "css-loader", "sass-loader"]
            })
        }]
    },
    plugins: [
        new cleanWebpackPlugin([distFolder],{
            root: __dirname,
            exclude: [],
            verbose: true,
            dry: false
        }),
        extractSass,
        new htmlWebpackPlugin({
            template: indexPath,
            inject: "body",
            filename: "index.html"
        })
    ]
}
