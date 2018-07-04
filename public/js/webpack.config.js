/*
    ./webpack.config.js
*/
const path = require('path');
const adminPage = 'http://krestonshirley.test/wp-admin/post.php?post=238&action=edit';
const BrowserPack = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './jsx/index.js',
    output: {
        path: path.resolve('output'),
        filename: 'index_bundle.js',

    },
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader" ,
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        new BrowserPack( {
                proxy: adminPage,
                files: [
                    '**/*.php'
                ],
                reloadDelay: 0
            }
        ),
    ]
}