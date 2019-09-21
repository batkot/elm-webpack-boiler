const appConfig = require('./app.config');
const path = require('path');

// Plugin for index.html generation
// Wires up scripts and stylesheets
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin for cleaning dist directory before build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Plugin for creating and hot reloading css files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: appConfig.entryPoint,
    output: {
        path: path.join(__dirname, appConfig.buildPath),
        filename: '[name]-[hash].js'//--appConfig.appName
    },
    module: {
        rules: [ 
            // SASS compilation
            {
                test: /\.s[ac]ss$/i,
                exclude: appConfig.excludes,
                use: [
                    //Create css files
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    //Load css
                    'css-loader',
                    //Add vendor specific stuff
                    'postcss-loader',
                    //Compile sass to css
                    'sass-loader'
                ]
            },
            // Images file serving
            {
                test: /\.(svg|jpg|png|gif)$/,
                loader: 'file-loader',
                include: [
                    path.resolve(__dirname, appConfig.staticsPath)
                ],
                options: {
                    context: path.resolve(__dirname, appConfig.staticsPath)
                }
            },
            // Elm compilation
            {
                test: /\.elm$/,
                exclude: appConfig.excludes,
                use: [
                    // Babel loader to enable using webpack assets in Elm
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['module:babel-elm-assets-plugin']
                        }
                    },
                    {
                        loader: 'elm-webpack-loader',
                        options: {
                            optimize: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: appConfig.indexPath,
            inject: 'body',
            filename: 'index.html'
        })
    ]
}
