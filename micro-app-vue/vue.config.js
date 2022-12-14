const path = require('path');
const packageName = require('./package.json').name;

module.exports = {
  devServer: {
    port: 10200,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  transpileDependencies: ['micro-app-common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@src': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      }
    },
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    }
  }

}