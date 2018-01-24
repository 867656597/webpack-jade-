const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const config = require('./../config');

const untils = require('./untils');
const getObj = untils.getEntries('src/**/index.pug')
const entries = getObj.entries;
const HTMLPlugins = getObj.HTMLPlugins;

module.exports = {
	entry: entries,
    output: {
        path: config.build.assetsRoot,
        // publicPath: '../dist/',
        filename: "js/[name][hash].js"
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            
        }
    },
    module: {
    	rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                enforce: "pre",
                use: ['es3ify-loader','babel-loader', 'eslint-loader'],
            },
    		{
    			test: /\.css$/,
    			use: ['style-loader','css-loader']
    		},
    		{
    			test: /\.pug$/,
    			use: ['html-loader','pug-html-loader']
    		},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
    	]
    },
    externals: {
        layui: 'layui'
    },
    plugins: [
        ...HTMLPlugins

    ]
}