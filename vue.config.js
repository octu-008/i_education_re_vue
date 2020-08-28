const path = require('path');
function resolve(dir)
{
  return path.join(__dirname,dir);
}
module.exports = {
  devServer:{
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
  chainWebpack: (config) =>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('assets',resolve('./src/assets'))
    .set('views',resolve('./src/views'))
    .set('network',resolve('./src/network'))
  }
}