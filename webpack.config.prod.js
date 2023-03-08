const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = ['offline', 'prompt'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
  module: {
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: false,
      chunks: ['main']
    }),
  ].concat(multipleHtmlPlugins)
};

