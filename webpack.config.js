var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.(ttf|eot)$/,
            loader: 'file?name=fonts/[name].[ext]'
        }, {
            test: /\.(woff2?|png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            '/getFirstLevel': {
                target: 'http://freshman.wutnews.net/API.php',
                changeOrigin: true,
                secure: false
            },
            '/getSecLevel*': {
                target: 'http://freshman.wutnews.net/API.php',
                changeOrigin: true,
                secure: false
            },
            '/getArticleById*': {
                target: 'http://freshman.wutnews.net/API.php',
                changeOrigin: true,
                secure: false
            }
        }
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}