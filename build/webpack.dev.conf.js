const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const path = require('path');

const devWebpackConfig = merge(baseWebpackConfig,  {
    devServer:{
        contentBase: path.join(__dirname, '../src'),
        host: '0.0.0.0',
        port: '8080',
        inline:true,
        disableHostCheck: true,
        // hot:true,
        overlay: true
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [
          { 
              test: /\.scss$/, 
              use: ['css-loader','sass-loader'],
          }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
    ]
})

module.exports = devWebpackConfig;