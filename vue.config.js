const WebpackDotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new WebpackDotenvPlugin({
        sample: './.env.example',
        path: './.env',
      }),
    ],
  },
  productionSourceMap: true,
  css: {
    sourceMap: true,
  },
};
