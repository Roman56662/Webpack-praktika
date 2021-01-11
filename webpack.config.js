const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
context: path.resolve(__dirname, 'src'),
mode: 'development',
entry: './index.js', //точка входа, может быть несколько точек в массиве
output: {
path: path.resolve(__dirname, 'dist'),
 //можно использовать следующую структуру
filename: '[name].[contenthash].js',
},
plugins: [
    new HTMLWebpackPlugin({
    template: './index.html'
    }), 
    new CleanWebpackPlugin()
],
module: {
    rules: [
        { 
            test:/\.css$/,
            use :[ 'style-loader','css-loader']
        },
        {
            test: /\.styl$/,
            use :['style-loader','css-loader','stylus-loader']
        }
    ]
}
};