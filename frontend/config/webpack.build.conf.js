/* Build config:
  ========================================================================== */
/* Base config:
  ========================================================================== */

  const path = require('path')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const ImageminPlugin = require('imagemin-webpack-plugin').default;
  
  // Main const
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../../prod'),
    assets: 'assets/'
  }

module.exports = {
  mode: 'production',
  performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    entry: {
      app: './src/index.js'
      // module: `${PATHS.src}/your-module.js`,
    },

    externals: {
      paths: PATHS
    },
  
    output: {
      filename: `${PATHS.assets}js/[name].js`,
      path: PATHS.dist,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [
        {
          // JavaScript
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          // Fonts
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          // images / icons
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          // scss
          test: /\.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: `./postcss.config.js` }
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        },
        {
          // css
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: `./postcss.config.js` }
              }
            }
          ]
        }
      ]
    },
    // resolve: {
    //   alias: {
    //     '~': PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
    //     '@': `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
    //   }
    // },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`
      }),
      new CopyWebpackPlugin({
        patterns: [
          // Images:
          {
            from: `${PATHS.src}/${PATHS.assets}img`,
            to: `${PATHS.assets}img`
          },
          // Fonts:
          {
            from: `${PATHS.src}/${PATHS.assets}fonts`,
            to: `${PATHS.assets}/fonts`
          },
          // Static (copy to '/'):
          // {
          //   from: `${PATHS.src}/static`,
          //   to: ''
          // }
        ]
      }),
      new ImageminPlugin(),
    ]
  }
  