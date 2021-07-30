const path = require('path')

module.exports = {
  pages: { //solved width https://stackoverflow.com/questions/50898675/how-can-i-change-main-folders-in-vue 
    index: {
      entry: 'front/src/main.js',
      template: 'front/public/index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'front/src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('copy')
      .use(require('copy-webpack-plugin'), [[{
        from: path.resolve(__dirname, 'front/public'),
        to: path.resolve(__dirname, 'dist'),
        toType: 'dir',
        ignore: ['.DS_Store']
      }]])
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/sass/utils/_variables.scss";
          @import "@/sass/utils/_mixins.scss";
        `
      }
    }
  }
}
