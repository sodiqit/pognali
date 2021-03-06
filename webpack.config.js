const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./public")
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".pug"));

const devServer = () => {
  return {
    contentBase: path.join(__dirname, `public`),
    host: `192.168.0.105`,
    port: 8082,
    compress: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }

  if (isProd) {

    config.minimize = true;

    config.minimizer = [
      new TerserPlugin()
    ]
  }

  return config;
};

const plugins = () => {

  const pluginConf = [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `css/${fileName("css")}`
    }),

    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: "img" },
      { from: `${PATHS.src}/fonts`, to: "fonts"}
    ]),

    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/,'.html')}`,
          chunks: [`${page.replace(/\.pug/,'')}`, `vendors`]
        })
    ),
  ]

  if (isProd) {
    pluginConf.push(new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality:  75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }));

    pluginConf.push(new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 3 },
      gifsicle: { optimizationLevel: 1 },
      pngquant: { quality: "70-75" },
      svgo: {},
      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    }));
  }

  return pluginConf;
};

module.exports = {
  entry: {
    index: `${PATHS.src}/index`,
    form: `${PATHS.src}/form`,
    catalog: `${PATHS.src}/catalog`
  },
  output: {
    filename: `js/${fileName("js")}`,
    path: PATHS.dist
  },
  devtool: isDev ? "source-map" : false, //"cheap-module-eval-source-map" - not working
  devServer: isDev ? devServer() : {},
  module: {
    rules: [
      {
        // Pug
        test: /\.pug$/,
        loader: "pug-loader",
        query: {
          pretty: true
        }
      },
      {
        // JavaScript
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
       {
        // Fonts
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "./../fonts",
          outputPath: "./fonts"
        }
      },
      {
        // images / icons
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              publicPath: "./../img",
              outputPath: "./img"
            }
          }
        ],

      },
      {
        // less
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: { sourceMap: isDev }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDev,
              config: { path: `./postcss.config.js` }
            }
          },
          {
            loader: "group-css-media-queries-loader",
            options: { sourceMap: isDev }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: isDev
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [`.js`, `.jsx`, `.less`],
    alias: {
      "@j": path.resolve(__dirname, 'src/js/'),
      img: path.resolve(__dirname, 'src/img/')
    }
  },

  optimization: optimization(),

  plugins: plugins()
};
