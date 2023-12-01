const path = require("path");
const { BannerPlugin, DefinePlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: `${packageJson.name}.user.js`,
    path: path.resolve(__dirname, "dist"),
  },
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
  plugins: [
    new DefinePlugin({
      "process.env.VERSION": JSON.stringify(packageJson.version),
    }),
    new BannerPlugin({
      banner: () => {
        const userscriptConfig = require("fs").readFileSync(
          "./userscript.config.js",
          "utf8"
        );
        return userscriptConfig.replace("__VERSION__", packageJson.version);
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: (node, { type, value }) =>
              type === "comment2" && /^!/.test(value),
          },
        },
        extractComments: false,
      }),
    ],
  },
};
