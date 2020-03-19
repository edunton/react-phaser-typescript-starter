const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resourceFactory = require('./webpack.resources');

module.exports = env => {
    let isDev = env.target === 'development'
    let mode = isDev ? 'development' : 'production';
    let devtool = isDev ? 'inline-source-map' : undefined;
    let transpileOnly = !isDev;
    let resources = resourceFactory({base:'build/'});
  
    const versionNumber = `${require("./package.json").version}.${new Date().toISOString().replace(/[^\d]/g,'')}`
  
    console.log(chalk`\n\nCompiling for {greenBright.bold ${mode.toUpperCase()}} at {bold v.${versionNumber}}\n\n`);
    return {
  
      entry: path.resolve(__dirname,'src/index.tsx'),
      watch: isDev,
      watchOptions: {
        ignored: ["**/build/**/*"],
        poll: 1000
      },
      output: {
          path: path.resolve(__dirname, 'build'),
          filename: 'project.bundle.[contenthash].js'
      },
  
      devtool,
      mode,
  
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          // name:true,
          cacheGroups: {
              vendor: {
                chunks: 'all',
                // name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                enforce: false,
                name(module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `npm.${packageName.replace('@', '')}`;
                },
              },
          }
        },
      },
  
      module: {
          rules: [
            {
              test: /redux$/,
              resolve: {
                mainFields: ['module', 'main', 'unpkg']
              }
            },
            {
              test: [ /\.vert$/, /\.frag$/ ],
              use: 'raw-loader'
            },
            {
              test: /\.tsx?$/,
              use: {
                loader:'ts-loader',
                options: {
                  transpileOnly,
                },
              },
              exclude: /node_modules/,
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: require('node-sass'),
                    sassOptions: {
                      fiber: false,
                    },
                  },
                },
              ],
            },
          ]
      },
  
      resolve: {
          extensions: [ '.tsx', '.ts', '.js' ]
      },
  
      plugins: [
          new webpack.DefinePlugin({
              'CANVAS_RENDERER': JSON.stringify(true),
              'WEBGL_RENDERER': JSON.stringify(true),
  
              '__VERSION__' : JSON.stringify(versionNumber),
              '__IS_DEV__': JSON.stringify(isDev),
          }),
  
          new CopyPlugin(resources.copy),
  
          new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'index.html'),
            filename:'index.html',
          }),
  
          ...resources.write.map(w=>new CreateFileWebpack(w)),
      ],
    }
  };