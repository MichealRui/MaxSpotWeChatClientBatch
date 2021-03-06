var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

/* baseConfig */
var baseConfig = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        loader: "url-loader?mimetype=image/png"
        // loader: "url-loader?limit=10000&name=img/[name].[hash:6].[ext]"
      },
      {
        test: /\.(gif)$/,
        loader: "url-loader?mimetype=image/gif"
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  devServer: {
    contentBase: './client',
    // disableHostCheck: true,
    hot: true
  }
}
/* end baseConfig */

/* get env */
function getEnv() {
  const args = require('minimist')(process.argv.slice(2));
  var env;
  if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
  } else if (args.env) {
    env = args.env;
  } else {
    env = 'dev';
  }
  return env
}

var env = getEnv()
/* end get env */

/*define envConfig*/
var envConfig = {
  'build' : {
    output: {
      path: path.join(__dirname, './static'),
      filename: 'bundle-[hash:6].js',
      chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
      }),
      new webpack.ProvidePlugin({
          ENV: __dirname + '/client/env/' + (process.env.NODE_ENV || 'development'),
          DEFALUT_INFO : __dirname + '/client/defaultInfo/development',
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
  },
  'dev': {
    output: {
      path: path.join(__dirname, './static'),
      filename: 'bundle.js',
      chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    // externals:{
    //   'BMap':'BMap'
    // },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
      }),
      new webpack.ProvidePlugin({
          ENV: __dirname + '/client/env/' + (process.env.NODE_ENV || 'development'),
          // DEFALUT_INFO : __dirname + '/client/env/' + (process.env.NODE_ENV || 'development'),
          DEFALUT_INFO : __dirname + '/client/defaultInfo/development',
      }),
    ]
  },
  'test' : {
    output: {
      path: path.join(__dirname, './static'),
      filename: 'bundle-[hash:6].js',
      chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'test') }
      }),
      new webpack.ProvidePlugin({
        ENV: __dirname + '/client/env/' + (process.env.NODE_ENV || 'test'),
        DEFALUT_INFO : __dirname + '/client/defaultInfo/development',
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
  },
}

/* end define envConfig*/

module.exports = Object.assign({}, baseConfig, envConfig[env])