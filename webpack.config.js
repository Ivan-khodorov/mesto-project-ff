const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    devServer: {
        static: './dist',
        compress: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
};
