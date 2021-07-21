const src = 'src'
    , dist = 'public'

const path = require('path')
    , { CleanWebpackPlugin } = require('clean-webpack-plugin')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , MiniCssExtractPlugin = require('mini-css-extract-plugin')
    , CopyWebpackPlugin = require('copy-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
    , isProd = !isDev

module.exports = {
    entry: {
        index: ["@babel/polyfill", path.resolve(__dirname, src, 'index.js')]
    },
    output: {
        path: path.resolve(__dirname, dist),
        publicPath: isProd || isDev ? '' : '/',
        filename: '[name].js'
    },
    optimization: {
        concatenateModules: true,
        minimize: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, src + '/index.html'),
            title: 'Server test',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, src, 'assets/images/'),
                    from: '**/*.{gif,jpeg,jpg,svg,png,webp}',
                    to: 'assets/images/',
                    noErrorOnMissing: true
                },
                {
                    context: path.resolve(__dirname, src, 'assets/fonts/'),
                    from: '**/*.{woff,woff2,eot,ttf,svg}',
                    to: 'assets/fonts/',
                    noErrorOnMissing: true
                },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-proposal-private-property-in-object",
                            "@babel/plugin-proposal-private-methods",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-class-static-block",
                            "@babel/plugin-proposal-numeric-separator"
                        ]
                    }
                }
            }
        ]
    }
}