const path = require('path');
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const isDev = process.env.NODE_ENV !== 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: isDev,
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@utils', resolve('src/utils'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@common', resolve('src/common'))
      .set('@views', resolve('src/views'))
      .set('@public', resolve('public'));
  }
};