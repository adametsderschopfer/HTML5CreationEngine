const path = require("path");

module.exports = {
  entry: ["./engine/index.js", "./example/static/game/index.js"],
  entry: {
    GameEngine: "./engine/index.js",
    // app: './game/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist"),

    publicPath: "/dist",
    library: "GameEngine",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "example"),
  },
};
