const appConfig = require('./app.config');
const path = require('path');

// Plugin for index.html generation
// Wires up scripts and stylesheets
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: appConfig.entryPoint,
    output: {
        path: path.join(__dirname, appConfig.buildPath),
        filename: appConfig.appName
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
