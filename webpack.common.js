const path = require('path');
const name = require('./package.json').name;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    app: './src/index.js'
  },
  name:name,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules\//,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name:'[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'js/' + name + '.min.js',
    path: path.resolve(__dirname, './public'),
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/' + name + '.min.css'
    }),
    new HtmlWebPackPlugin({
      title: name,
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets/img/', to: '../public/assets/img/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure1.csv', to: '../public/assets/data/2023-pci_figure1_en.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure1 ES.csv', to: '../public/assets/data/2023-pci_figure1_es.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure1 FR.csv', to: '../public/assets/data/2023-pci_figure1_fr.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure2.csv', to: '../public/assets/data/2023-pci_figure2_en.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure2 ES.csv', to: '../public/assets/data/2023-pci_figure2_es.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure2 FR.csv', to: '../public/assets/data/2023-pci_figure2_fr.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure3.csv', to: '../public/assets/data/2023-pci_figure3.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/data - Figure4.csv', to: '../public/assets/data/2023-pci_figure4.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'src/font/', to: '../public/font/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: './favicon.png', to: '../public', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }}
      ]
    })
  ]
};