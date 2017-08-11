var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        path.resolve(__dirname, '../src/server/app.js')
    ],
    output: {
        path: path.resolve(__dirname, '../server'),
        filename: 'server.bundle.js'
    },
    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        ]
    },
    resolve: {
        extension: ['', '.js', '.json']
    }
}