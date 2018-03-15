// nodejs 中的path模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry:{index:[path.join(__dirname, './src/index.js')]},
    // 输出配置
    output: {
        // 输出路径
        path: path.join(__dirname, './dist'),
        publicPath: './',
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:4].child.js'
    },
    resolve: {
        extensions: ['.js','.vue','.sass'],
        alias: {
            'Vue': 'vue/dist/vue.js',
            'S':path.resolve(__dirname,'./src/shared/'),
            '@':path.resolve(__dirname,'./src/'),
        }
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'sass-loader']
                        }),
                        css:ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: "css-loader"
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader?limit=8192&name=./fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(jpeg|png|gif|jpg)$/,
                loader: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]'
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        //new webpack.DefinePlugin({
        //    'process.env':{
        //        NODE_ENV: '"production"'
        //    }
        //}),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename:'style/main[hash:8].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.join(__dirname, './src/index.html'),
            inject: true,
            favicon:'./favicon.ico'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};