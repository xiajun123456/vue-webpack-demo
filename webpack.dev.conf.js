// nodejs 中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 引入基本配置
let config = require('./webpack.config');

config.output.publicPath = '/';

// 动态向入口配置中注入 webpack-hot-middleware/client 使用webpack文件
// Object.keys(config.entry).forEach(function (name) {
//     config.entry[name] = ['./dev-client'].concat(config.entry[name])
// });

config.plugins = [
    new webpack.DefinePlugin({
       'process.env':{
           NODE_ENV: '"production"'
       }
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
        filename:'style/main[hash:8].css',
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: path.resolve(__dirname, './src/index.html'),
        inject: true,
        favicon:'./favicon.ico'
    })
];

module.exports = config;