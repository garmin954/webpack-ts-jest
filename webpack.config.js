const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CleanWebpackPlugin不是一个构造函数，需要用引入对象的行是
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // 指定入口文件
    entry: './src/main.ts',
    // 指定打包文件所在目录
    output: {
        // 指定打包文件为目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'main.js',
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use:[
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        options: {
                            // 设置预定义的环境
                            presets:[
                                [
                                    // 指定环境插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 运行在兼容的的浏览器版本
                                        targets:{
                                            "chrome":"88"
                                        },
                                        // 使用的corejs版本
                                        "corejs":"3",
                                        // 使用corejs的方式
                                        // usage表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                    {
                                        // 当前最新的两个版本浏览器
                                        browsers: 'last 2 versions',
                                    },
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            }
        ],
    },
    // webpack插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // title: 'webpack测试文件', // 和template同时设置时，title不生效
        }),
        new CleanWebpackPlugin(),
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.js', '.ts'],
    },
};
