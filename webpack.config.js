const path = require('path');

module.exports = {
    entry: './src/index.js',    // Webpack will use this as you application entry point from where to start building up it's depencenct tree
    output: {
        filename: 'bundle.js',  // Here we tell WP what to call out bundled JS file
        path: path.resolve(__dirname, 'dist') // Here we tell WP where to place the file. WP will create this dir-structure if it does not yet exist. The path MUST be an absolute-path, so we can use the Node package "path", to help generate it
    },
    mode: 'none'                // This will be where you state the environment this config is intended for: 'development', `production` or 'none'
}
