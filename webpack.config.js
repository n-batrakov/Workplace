const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Workplace',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'src/static',
            to: ''
        }]),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                cache: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};