const path = require('path');

module.exports = {
    entry: './src/index.js',    // Webpack will use this as you application entry point from where to start building up it's depencenct tree
    output: {
        filename: 'bundle.js',  // Here we tell WP what to call out bundled JS file
        path: path.resolve(__dirname, 'dist'), // Here we tell WP where to place the file. WP will create this dir-structure if it does not yet exist. The path MUST be an absolute-path, so we can use the Node package "path", to help generate it
        publicPath: 'dist/'     // Tells Webpack where to files your static resoursce (absolute-path). You can also specify a CDN here or a your seperate image server etc. It is also used if you implement "Module Federation". Since WP5, if it's simply just your 'dist' dir you can ommit the 'publicPath` setting altogether.
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
                    'style-loader', // Used to inject CSS into a page using Styled Text. This bundles the CSS with the JS into the final bundled file
                    'css-loader',    // Reads content of CSS files and returns the content, but doesn't do anything else with it
                ]
            }
        ]
    }
};
