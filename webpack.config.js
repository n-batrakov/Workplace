const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Theme = require('./src/theme');

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },
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
        },{
            from: 'src/serviceWorkers/',
            to: ''
        }]),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: [
                    path.resolve(__dirname, 'src/serviceWorkers')
                ]
            },
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
                        javascriptEnabled: true,
                        modifyVars: Theme.toLessVariables()
                    }
                }]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        https: {
            key: fs.readFileSync('./cert/server.key'),
            cert: fs.readFileSync('./cert/server.crt'),
            ca: fs.readFileSync('./cert/rootCA.pem'),
          }
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