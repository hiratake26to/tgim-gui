const path = require('path')

module.exports = [
  {
    mode: 'development',
    target: "electron-renderer",
    entry: {
      renderer: path.join(__dirname, 'src/renderer/test.js')
    },
    output: {
      path: path.join(__dirname, 'test'),
      filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    }
  }
]
