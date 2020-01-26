const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './test.js',
  module: {
    rules: [{test:/\.js$/, use: 'babel-loader'}]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.bundle.js'
  }
};
