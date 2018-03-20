// CONFIG
const distFolder = "dist";
const fileName = "app.js";
const indexPath = "src/static/index.html";

const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, distFolder),
        filename: fileName
    },
    plugins: [
        new cleanWebpackPlugin([distFolder],{
            root: __dirname,
            exclude: [],
            verbose: true,
            dry: false
        }),
        new htmlWebpackPlugin({
            template: indexPath,
            inject: "body",
            filename: "index.html"
        })
    ]
}
