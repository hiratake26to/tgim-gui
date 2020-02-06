// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = [
  {
    mode: 'development',
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
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.py$/, loader: 'file-loader', options: {outputPath: 'script'} },
        { test: /\.(jpe?g|png|gif)$/, loader: 'file-loader', options: {outputPath: 'assets'} },
      ]
    }
  },
  {
    mode: 'development',
    target: "electron-renderer",
    entry: {
      app: './src/renderer/app.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.(jpe?g|png|gif)$/, loader: 'file-loader', options: {outputPath: 'assets'} },
        { test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=semantic/dist/themes/default/assets/fonts/[name].[ext]' },
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery'
      }),
      // generate index.html that contain script to load [preload|app|afterload].bundle.js
      new HtmlWebpackPlugin({
        chunks: ['app'],
        template: './src/index-temp.html',
        filename: path.join(__dirname, 'dist/index.html')
      })
    ]
  }
]
