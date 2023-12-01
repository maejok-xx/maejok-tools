const path = require("path");
const package = require("./package.json");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: package.name + ".user.js",
    path: path.resolve(__dirname, "dist"),
  },
  // optimization: {
  //   minimize: false, // Disable minification to comply with GreasyFork policies
  // },
  resolve: {
    extensions: [".js", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
