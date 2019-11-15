const path = require('path');

module.exports = {
  chainWebpack(config) {
    config
      .entry('index')
      .add('./example/index.js')
      .end()
      .output.path(path.resolve(process.cwd(), './demo'));
  },
  configureWebpack: {
    optimization: {
      minimize: false,
    },
  },
};
