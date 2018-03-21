// CONFIG
const distFolder = "dist";
const appName = "[name]-[hash].js";
const indexPath = "src/static/index.html";
const excludes = [/elm-stuff/, /node_modules/];

const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractSass = new extractTextWebpackPlugin({
    filename: "[name]-[contenthash].css"
});

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
            use: extractSass.extract({
                use: 
                    [ "css-loader"
                    , {
                        loader: "postcss-loader",
                        options: {
                            plugins: function(){
                                return [
                                    require("autoprefixer")
                                ];
                            }
                        }
                    }
                    , "sass-loader"]
            })
        },
        { 
            test: /\.elm$/,
            exclude: excludes,
            use: {
                loader: "elm-webpack-loader"
            }
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
