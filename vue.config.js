const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

const pagesConfig = require('./pages_config/pages.js');
const publicPath = pagesConfig.publicPath;
const pages = pagesConfig.pages;

module.exports = {
  productionSourceMap: false,
  publicPath,
  pages,
  chainWebpack: (config) => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
    config.resolve.alias
      .set('~', resolve('src/assets'));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/_mixins.scss"`
      },
      scss: {
        prependData: `@import "@/assets/style/_mixins.scss";`
      },
    }
  }
};
