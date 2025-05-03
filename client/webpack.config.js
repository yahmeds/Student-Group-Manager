const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    'groups': path.resolve(__dirname, 'javascript/groups.js'),
    'students': path.resolve(__dirname, 'javascript/students.js'),
  },
  output: {
    path: path.resolve(__dirname, '../server/public'), 
    filename: 'javascripts/[name].js',
  },
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    static: {
      publicPath: path.resolve(__dirname, '../server/public'), 
    },
    host: 'localhost',
    port: 8888,
    open: 'firefox',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/students.html',
      filename: './students.html',
      chunks: ['students'],
    }),
    new HtmlWebpackPlugin({
      template: './html/groups.html',
      filename: './groups.html',
      chunks: ['groups'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './html/index.html',
          to: 'index.html',
          noErrorOnMissing: true,
        },
        {
          from: './style/style.css', 
          to: 'style/[name][ext]',    
        }

        

      ],
    }),
  ],
};
