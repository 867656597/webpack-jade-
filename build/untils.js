const glob = require('glob');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');



// 获取指定路径下的入口文件
//globPath: 所有的index.pug目录;
const getEntries = (globPath) => {
    let files = glob.sync(globPath),
        entries = {},
        HTMLPlugins = [];
    files.forEach(function(filepath){
        const jsFile = filepath.replace('pug','js')
        const split = filepath.split('/');
        let name = '';
        //入口的index文件
        if(split.length === 2){
            name = 'index';
            templatePath = path.resolve(__dirname, '../src/index.pug')
        }else if(filepath.indexOf('home')){
            name = split[split.length - 3]+'by'+split[split.length - 2];
            templatePath = path.resolve(__dirname,'../' + filepath);
        }else{

        }
        entries[name] = './' + jsFile;
        const htmlPlugin = new HTMLWebpackPlugin({
            filename: `${name}.html`,
            template: templatePath,
            chunks: [`${name}`,'common'],
            inject  : "body",
        });
        HTMLPlugins.push(htmlPlugin)

    })
    // files.forEach(function(filepath) {
    //     // 取倒数第二层(view下面的文件夹)做包名
    //     var split = filepath.split('/');
    //     if(split.length >= 4){
    //         var name = split[split.length - 3]+'by'+split[split.length - 2];
    //         entries[name] = './' + filepath;
    //           //生成htmL集合
    //         const htmlPlugin = new HTMLWebpackPlugin({
    //             filename: `${name}.html`,
    //             template: path.resolve(__dirname, `../src/home/${split[split.length - 3]}/${split[split.length - 2]}/index.pug`),
    //             chunks: [`${name}`,'commons'],
    //             inject  : "body",
    //         });
    //         HTMLPlugins.push(htmlPlugin)
    //      }
    //  });
     // entries["index"]='./src/index.js';
     // HTMLPlugins.push( new HTMLWebpackPlugin({
     //            filename: 'index.html',
     //            template: path.resolve(__dirname, `../src/index.pug`),
     //            chunks: ["index",'commons'],
     //            inject  : "body",
     //        }))
     return {
        entries,
        HTMLPlugins
     }
}

module.exports = {
    getEntries
}