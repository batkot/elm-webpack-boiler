const appConfig = require('./app.config');
const path = require('path');

// Plugin for index.html generation
// Wires up scripts and stylesheets
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin for cleaning dist directory before build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: appConfig.entryPoint,
    output: {
        path: path.join(__dirname, appConfig.buildPath),
        filename: '[name]-[hash].js'//--appConfig.appName
    },
    module: {
        rules: [ 
            // Elm compilation
            {
                test: /\.elm$/,
                exclude: appConfig.excludes,
                use: {
                    loader: 'elm-webpack-loader',
                    options: {}
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
}
