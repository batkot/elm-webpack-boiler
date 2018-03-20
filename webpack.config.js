const distFolder = "dist";
const fileName = "app.js";

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, distFolder),
        filename: fileName
    },
    plugins: [
        new htmlWebpackPlugin()
    ]
}
