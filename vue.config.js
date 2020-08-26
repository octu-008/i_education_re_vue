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
  }
}