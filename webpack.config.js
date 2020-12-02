const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry:{
        app:'./src/index.js'
    },
    output:{
        path:__dirname + '/dist',
        filename:'./dist/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test : /\.css$/,
                loader : ["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            hash : true,
            filename : "./index.html",
            template : "./src/index.html",
            title : "React Demo App"
        })
    ]
}