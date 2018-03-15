/**
 * Created by xiajun on 2017/4/5.
 */
// 引入必要的模块
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.conf');
const proxyMiddleware = require('proxy-middleware');
const url = require('url');
const env = require('./config/env-dev');

// 创建一个express实例
const app = express();

// 调用webpack并把配置传递过去
const compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

//// 使用 webpack-hot-middleware 中间件
let hotMiddleware = require('webpack-hot-middleware')(compiler);
//// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
       // 发布事件
       hotMiddleware.publish({ action: 'reload' });
       cb()
   })
});

// 注册中间件
app.use(devMiddleware);

////// 注册中间件
app.use(hotMiddleware);


//代理中间件 配置代理 通过proxy-middleware插件
let proxyTo1 = function () {
    //服务器地址
    //var serverAddress = ;
    let serverAddress = env.proxy.serverAPI;
    //代理路径
    let route = env.proxy.serverURL;
    let serverOptions = url.parse(serverAddress);
    serverOptions.route = route;
    return proxyMiddleware(serverOptions);
};
//注册中间件
app.use(proxyTo1());

// 监听 8888端口，开启服务器
app.listen(env.proxy.port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:'+env.proxy.port)
});