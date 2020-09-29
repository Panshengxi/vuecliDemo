const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: './static', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: './index.html',
  pluginOptions: {
    'style-resources-loader': {//配置less
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, '@/assets/common.less')]
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))//别名配置
  }
}
