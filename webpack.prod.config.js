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
        filename: appConfig.appName
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        }),
        new HtmlWebpackPlugin()
    ]
}
