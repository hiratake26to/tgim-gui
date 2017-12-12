const path = require('path')

module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: __dirname,
      filename: 'index.js'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        } 
      ]
    },
    target: "electron"
  },
  {
    entry: './src/browser/app.js',
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    target: "node"
  },
];
