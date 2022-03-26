const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederarionPlugin } = require('webpack').container;

module.exports = {
    entry: './src/hello-world.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:9001'  // Here we need to tell the Module Federation on which public URL the exposes components can be used. This will be added to the "remoteEntry.js" file we set below in the ModuleFederationPlugin
    },
    mode: 'development',
    devServer: {
        port: 9001,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'hello-world.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            title: 'Hello world',
            description: 'Hello world',
            template: 'src/page-template.hbs'
        }),
        new ModuleFederarionPlugin({
            name: 'HelloWorldApp',          // Give this application a Name for Module Federation to identify it
            filename: 'remoteEntry.js',     // During the build process Webpack will generate a file that contains everything this Application container exports - here we pick a name for that file
            exposes: {                      // In this Object we describe the components that we want to expose to other applications
                './HelloWorldButton': './src/components/hello-world-button.js'  // Name that other apps can reference and the path inside this app to the component we are exposing
            }
        })
    ]
};
