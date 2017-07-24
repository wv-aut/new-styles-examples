
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
var os = require('os')
const env = process.env.NODE_ENV || 'development'




let config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
        })
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'file-loader?name=[name].[ext]&publicPath=fonts&outputPath=fonts/'
            },
            {
                test: /\.svg$/,
                use: [
                    'file-loader?name=[name].[ext]&publicPath=fonts&outputPath=images/',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {removeTitle: true},
                                {convertColors: {shorthex: false}},
                                {convertPathData: false}
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)/,
                use: 'file-loader?name=[name].[ext]&publicPath=fonts&outputPath=images/'
            }    
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'}),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8000
    }
}

if (env === 'development') {
    // config.plugins.push(
    //     new CleanWebpackPlugin(['dist'], {
    //         root: __dirname,
    //         verbose: true, 
    //         dry: false
    //     })
    // )
    config.output.publicPath = '/'
}


var ifaces = os.networkInterfaces()

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address)
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address)
    }
    ++alias
  });
});

module.exports = config

