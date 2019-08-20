const path = require('path')
const webpack = require('webpack')

// 导入 html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin')

// 导入 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置文件 就是一个js文件， 通过 node 模块操作， 向外暴露一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'),    // 入口
    output: {   // 输出文件相关配置
        path: path.join(__dirname, './dist'),   // 指定输出路径
        filename: 'bundle.js'       // 指定输出文件名

    },
    devServer: {    // 这是配置 dev-server 命令参数的第二种形式， 相对来说， 这种方式麻烦一些
        open: true, // 自动打开浏览器
        port: 9999, // 端口号
        contentBase: 'src', // 托管的根目录
        hot: true,   // 启用热更新
    },
    plugins: [  // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(),    // new 一个热更新的模块对象
        new htmlWebpackPlugin({ // 创建一个在内存中生成 html 页面的插件
            // title: 'myAPP',
            template: path.join(__dirname, './src/index.html'), // 指定模板页面， 根据指定页面生成内存中的页面
            filename: 'index.html' // 指定生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    module: {   // 用于配置第三方模块加载器
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=10000' },    //&name=[name].[ext] 图片名不变
            { test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader' },     // 处理字体文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },     // 配置 babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {    // 修改 vue 导入时的路径
            // 'vue$': "vue/dist/vue.js"
        }
    }
}