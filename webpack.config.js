const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssNormalize = require("postcss-normalize");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "astroturf/css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssNormalize(/* pluginOptions */)],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader", "astroturf/loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
