const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: path.resolve(__dirname, './src/js/vue-version/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
}