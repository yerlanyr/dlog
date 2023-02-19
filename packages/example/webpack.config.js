const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<div id="root"></div>`,
    }),
  ],
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        include: path.resolve(__dirname, 'src'),
        options: {},
      },
    ],
  },
  optimization: {
    usedExports: true,
  },
}
