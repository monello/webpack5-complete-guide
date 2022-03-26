const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',    // Webpack will use this as you application entry point from where to start building up it's depencenct tree
        'island-image': './src/island.js'
    },
    output: {
        filename: '[name].[contenthash].js',  // [name] wil be replaced with the names we specified in the entry points and [contenthash] by the md4-hash. There is also an option [id] which will insert a internal id instead of a human readable name (but we don't it here)
        path: path.resolve(__dirname, 'dist'), // Here we tell WP where to place the file. WP will create this dir-structure if it does not yet exist. The path MUST be an absolute-path, so we can use the Node package "path", to help generate it
        // publicPath: 'dist/'     // Tells Webpack where to files your static resoursce (absolute-path). You can also specify a CDN here or a your seperate image server etc. It is also used if you implement "Module Federation". Since WP5, if it's simply just your 'dist' dir you can ommit the 'publicPath` setting altogether.
        publicPath: ''     // Now that we use the "html-webpack-plugin" and index.html file is generated and placed inside the dist folder, we now need to ensure the paths to the included JS and CSS files load from the same folder as the new index.html file
    },
    mode: 'none',   // This will be where you state the environment this config is intended for: 'development', `production` or 'none'
    module: {
        rules: [
            // {
            //     test: /\.(jpg|png)$/,   // When Webpack find and "import" statement in a file that has one of these file extenstion it will process is as per "type" below...
            //     type: 'asset/resource' // Tells WP to add it as a separate file in the (output dir) dist-folder. The file-name will be MD4-hashed
            // },
            {
                test: /\.(jpg|png)$/,
                type: 'asset', // Tells WP to decide for us if it should be resource or inline base on asset file size (default 8Kb)
                parser: {   // Optional setting, for when you want to change the default file-size of the check
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8 kilobutes
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline' // Tells WB to add the asset as a Base64 encoded string directly in the output JS. That can make bundle sized large so use with careful consideration
            },
            {
                test: /\.txt$/,
                type: 'asset/source' // Tells WP to import the contents of this asset and incluse it inlne, as-is as a JS string
            },
            {
                test: /\.css$/,
                use: [
                    // The order is important. Webpack runs these loaders from right-to-left (or in the way I indented mine, bottom-up)
                    MiniCssExtractPlugin.loader,    // 2. Used to inject CSS into a page using Styled Text. This bundles the CSS with the JS into the final bundled file
                    'css-loader',                   // 1. Reads content of CSS files and returns the content, but doesn't do anything else with it
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // The order is important. Webpack runs these loaders from right-to-left (or in the way I indented mine, bottom-up)
                    MiniCssExtractPlugin.loader,    // 3. Used to inject CSS into a page using Styled Text. This bundles the CSS with the JS into the final bundled file
                    'css-loader',                   // 2. Reads content of CSS files and returns the content, but doesn't do anything else with it
                    'sass-loader'                   // 1. Converts SASS to CSS
                ]
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader']
            }
        ]
    },
    plugins: [
        new TerserPlugin(),             // This plugin minifies the output bundle
        new MiniCssExtractPlugin({      // This plugin is used to extract CSS into a separate bundle
            filename: '[name].[contenthash].css'      // Here you procide the name for the CSS bundle
        }),
        new CleanWebpackPlugin(),        // This plugin will delete everything inside the file we specify above in the "output" section of the config, before it re-builds the app
        // // You can also clean any other folders if you had any that needs cleaning
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         '**/*',  // This means, clean all files and directories
        //         path.join(process.cwd(), 'someotherfolder/**/**') // This means, clean all files and directories within the "someotherfolder" directory
        //     ]
        // })

        // See full list of available options here: https://github.com/jantimon/html-webpack-plugin#options
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            title: 'Hello World',    // Specify the title (inside the <title></title> tags) you want Webpack to use for the index.html it generates
            description: 'Some desctipion', // When using a template, you specify everything on this level (unlike below)
            // filename: 'subfolder/constum_filename.html',  // You can optionally change the index.html file's name and folder
            // meta: {   // Here you can specify any meta-tags you want to have added to the index.html file
            //     description: 'Some desctipion'
            // }
        })
    ]
};
