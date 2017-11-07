const { join, resolve } = require(`path`);
const webpack = require(`webpack`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const DashboardPlugin = require(`webpack-dashboard/plugin`);

const isDevelopment = process.env.NODE_ENV === `development`;

const phaserModule = join(__dirname, './node_modules/phaser/')
const phaser = join(phaserModule, 'build/custom/phaser-split.js')
const pixi = join(phaserModule, 'build/custom/pixi.js')
const p2 = join(phaserModule, 'build/custom/p2.js')

const entry = {
  app: [resolve(__dirname, `./src/index.js`)],
};

const output = {
  path: resolve(__dirname, `./dist/`),
  filename: isDevelopment ?
    `assets/[name]-[hash].js` : `assets/[name]-[chunkhash].js`,
  publicPath: `/`,
};

const plugins = {
  common: [
    new webpack.EnvironmentPlugin({ NODE_ENV: `production` }),
    new webpack.DefinePlugin({
      // add globals' names in .eslintrc to avoid warnings
      IS_DEVELOPMENT: JSON.stringify(isDevelopment),
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./src/index.ejs`,
      inject: `body`,
      cache: true,
      minify: !isDevelopment && {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    }),
  ],

  development: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  production: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: { comments: false },
      warnings: false,
      compress: { drop_console: true },
      sourceMap: true,
    }),
  ],
};

const rules = {
  common: [{
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: `babel-loader`,
  },
  { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
  { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
  { test: /p2\.js/, use: ['expose-loader?p2'] }, {
    test: /\.(mp3|ogg)$/,
    loader: `file-loader?name=assets/sounds/[name]-[hash].[ext]`,
  }],

  development: [{
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: `url-loader?limit=25000&name=assets/images/[name]-[hash].[ext]`,
  }],

  production: [{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [{
      loader: `url-loader`,
      options: {
        limit: 25000,
        name: `assets/images/[name]-[hash].[ext]`,
      },
    }, {
      loader: `image-webpack-loader`,
      query: {
        mozjpeg: {
          progressive: true,
        },
        progressive: true,
        optipng: {
          optimizationLevel: 6,
        },
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3,
        },
      },
    }],
  }],
};

const devServer = {
  host: process.env.DEV_HOST || `0.0.0.0`,
  port: process.env.DEV_PORT || 3000,
  contentBase: `dist/`,
  hot: true,
  stats: { colors: true },
};

module.exports = {
  devtool:
    process.env.DEVTOOL ||
    isDevelopment ? `cheap-module-eval-source-map` : `source-map`,
  entry: isDevelopment ? {
    ...entry,
    app: [
      `webpack-dev-server/client?http://localhost:${devServer.port}/`,
      `webpack/hot/only-dev-server`,
      ...entry.app,
    ],
  } : entry,
  output,
  resolve: {
    alias: {
      phaser,
      pixi,
      p2,
    }
  },
  plugins: isDevelopment ?
    [...plugins.common, ...plugins.development] :
    [...plugins.common, ...plugins.production],
  module: {
    rules: isDevelopment ?
      [...rules.common, ...rules.development] :
      [...rules.common, ...rules.production],
  },
  devServer,
};

