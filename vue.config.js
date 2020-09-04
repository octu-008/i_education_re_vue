const path = require('path');
function resolve(dir)
{
  return path.join(__dirname,dir);
}
module.exports = {
  devServer:{
    //跨域请求配置
    proxy: {
      '/api' :{
        target: 'http://localhost:8088/IEducation/',
        changeOrigin: true,
        pathRewrite: {
          '/api' : ''
        }
      }
    }
  },
  //项目内的文件夹路径别名
  chainWebpack: (config) =>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('assets',resolve('./src/assets'))
    .set('views',resolve('./src/views'))
    .set('network',resolve('./src/network'))
  }
}