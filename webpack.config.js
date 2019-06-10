const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = [
  {
    target: "electron-main",
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' } 
      ]
    }
  },
  {
    target: "electron-renderer",
    entry: {
      preload: './src/preload.js',
      app: './src/renderer/app.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    },

    plugins: [
      // generate index.html that contain script to load [preload|app].bundle.js(generated from preload.js app.js)
      new HtmlWebpackPlugin({
        filename: path.join(__dirname, 'dist/index.html'),
        template: './src/index-temp.html',
        inject: 'body'
      }),
      new HtmlWebpackTagsPlugin({
        // require liblarys(css,js) to here
        // those is will append to index.html, and will auto determine where is head or body
        tags: [
          'assets/default.css',
          'assets/bootstrap/css/bootstrap.min.css',
          'assets/bootstrap/css/bootstrap-theme.min.css',
          'assets/bootstrap/js/bootstrap.min.js',
          'assets/Semantic-UI-2.4/dist/semantic.css',
          'assets/Semantic-UI-2.4/dist/semantic.js'
        ]
      })
    ]
  }
]
