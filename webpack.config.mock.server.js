/**
 * Created by xiajun on 2017/4/5.
 */
// 引入必要的模块
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.conf');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
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
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
});

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({action: 'reload'});
        cb()
    })
});

// 注册中间件
app.use(devMiddleware);

//// 注册中间件
app.use(hotMiddleware);


//mock数据配置
let mockDir = path.resolve('./mock');
fs.readdirSync(mockDir).forEach(function (file) {
    let mock = require(path.resolve(mockDir, file));
    try { //异常捕获
        app.use(mock.url, function (req, res) {
            delete require.cache[require.resolve(path.resolve(mockDir, file))];
            let mocks = require(path.resolve(mockDir, file));
            if (mocks.status) {
                res.status(mocks.status)
            }
            res.json(mocks.data);
        });
    } catch (err) {

    }
});

//监听如果添加了文件配置接口
chokidar.watch(mockDir).on('change', function (file) {
    if (file.split('.')[1] == 'js') {
        try { //异常捕获
            if (require.cache[require.resolve(file)]) {
                delete require.cache[require.resolve(file)];
            }
            let mock = require(file);
            if (mock.url) {
                app.use(mock.url, function (req, res) {
                    delete require.cache[require.resolve(file)];
                    let mocks = require(file);
                    if (mocks.status) {
                        res.status(mocks.status)
                    }
                    res.json(mocks.data);

                });
            }
        } catch (err) {
            console.log(err)
        }
    }
});

// 监听端口，开启服务器
app.listen(env.mock.port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + env.mock.port)
});
