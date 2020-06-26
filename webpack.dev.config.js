const appConfig = require('./app.config');
const path = require('path');

// Plugin for index.html generation
// Wires up scripts and stylesheets
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin for cleaning dist directory before build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Plugin for creating and hot reloading css files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: appConfig.entryPoint,
    output: {
        path: path.join(__dirname, appConfig.buildPath),
        filename: appConfig.appName
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //Hot module replace
                            hmr: true
                        }
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
                    'elm-hot-webpack-loader',
                    {
                        loader: 'elm-webpack-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: appConfig.indexPath,
            inject: 'body',
            filename: 'index.html'
        }),
        new Webpack.DefinePlugin({
            __GREETING__: "'Party on the back'"
        })
    ],
    devServer: {
        inline: true,
        stats: 'errors-only',
        contentBase: path.join(__dirname, "src/static"),
        port: 3001,
        historyApiFallback: true
    }
}
