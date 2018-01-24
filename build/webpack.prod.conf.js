const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
const config = require('./../config');
const baseWebpackConfig = require('./webpack.base.conf.js');


const prodWebpackConfig = merge(baseWebpackConfig,{
     module: {
        rules: [
            { test: /\.scss$/, 
            use: ExtractTextPlugin.extract({
              // fallback:"style-loader",
              use: ['css-loader','sass-loader'],
              // publicPath: "/dist"  
            })
        }
        ]
    },
    plugins: [
        //删除dist目录
    	new CleanWebpackPlugin(
            ['./dist/**/*'],　 //匹配删除的文件
            {
                root: path.resolve(__dirname,'../'),       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            chunks: ['vendor'],
            minChunks: Infinity
        }),
        //合并重复模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            // children: true,
            minChunks: 2,
        }),
        //抽离css
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true,
        }),
        //丑化js
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            // sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        // 拷贝静态文件
	    new CopyWebpackPlugin([
	      	{
	        	from: path.resolve(__dirname, '../src/assets'),
	        	to: config.build.assetsSubDirectory,
	        	ignore: ['.*']
	      	}
	    ]),
    ]
})

prodWebpackConfig.entry.vendor = ['jquery'];

module.exports = prodWebpackConfig;