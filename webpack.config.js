const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {DefinePlugin} = require('webpack')

module.exports = {
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({title: 'GunPlay 3.0'}),
        new DefinePlugin({
            BACKEND_WS: JSON.stringify(process.env.BACKEND_WS || 'ws://192.168.46.145:8090'),
            BACKEND_API: JSON.stringify(process.env.BACKEND_API || 'http://192.168.46.145:8090')
        })
    ],
    output: {
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader', // creates style nodes from JS strings
                'css-loader', // translates CSS into CommonJS
                'sass-loader' // compiles Sass to CSS, using Node Sass by default
            ]
        },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }, {
                test: /\.(png|jpg|gif|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }

                ]
            }
        ]

    }
};