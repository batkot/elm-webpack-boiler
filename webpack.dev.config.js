// CONFIG
const distFolder = "dist";
const appName = "app.js";
const indexPath = "src/static/index.html";
const excludes = [/elm-stuff/, /node_modules/];

const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, distFolder),
        filename: appName
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: excludes,
            use: [ "style-loader", "css-loader", "sass-loader"]
        },
        { 
            test: /\.elm$/,
            exclude: excludes,
            use: [{
                loader: "elm-hot-loader"
            },
            {
                loader: "elm-webpack-loader",
                options: {
                    debug: true
                }
            }]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            template: indexPath,
            inject: "body",
            filename: "index.html"
        })
    ],
    devServer: {
        inline: true,
        stats: "errors-only",
        contentBase: path.join(__dirname, "src/static/assets"),
        port: 3000,
        historyApiFallback: true
    }
}
