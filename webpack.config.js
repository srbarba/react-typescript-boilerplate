const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const postcssNormalize = require('postcss-normalize');


module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';
  let webpackPlugins = [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
    })
  ];

  if (isProduction) {
    webpackPlugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new CompressionPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled'
      })
    );
  }

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    entry: './src/index.tsx',
    output: {
      path: __dirname + '/build',
      filename: 'index.js'
    },
    devServer: {
      inline: true,
      contentBase: './public',
      port: 3000
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      alias: {
        lib: path.resolve(__dirname, 'lib/'),
        app: path.resolve(__dirname, 'src/app/'),
        pages: path.resolve(__dirname, 'src/app/pages/'),
        components: path.resolve(__dirname, 'src/app/components/')
      }
    },
    module: {
      rules: [
        { test: /\.(png|jpe?g|gif)$/i, use: ['file-loader'], exclude: /node_modules/ },
        { test: /\.(jpg|png|gif|svg)$/, use: ['image-webpack-loader'], enforce: 'pre', exclude: /node_modules/ },
        { test: /\.svg$/, use: ['@svgr/webpack', 'url-loader'], exclude: /node_modules/ },
        { test: /\.(ts|js)x?$/, use: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ },
        { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre', exclude: /node_modules/ },
        {
          test: /\.s(a|c)ss$/,
          exclude: /node_modules/,
          loader: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: !isProduction
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            {
              loader: 'postcss-loader', 
              options: {
                ident: 'postcss',
                plugins: () => [
                  postcssNormalize()
                ]
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [path.resolve(__dirname, 'lib/themes/default/_variables.scss')]
              }
            },
          ]
        }
      ]
    },
    plugins: webpackPlugins
  }
};