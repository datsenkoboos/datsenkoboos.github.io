const { defineConfig } = require('@vue/cli-service')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new ImageminPlugin({
        pngquant: {
          quality: '90-95'
        }
      })
    ]
  }
}