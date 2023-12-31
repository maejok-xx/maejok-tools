const path = require("path");
const { BannerPlugin, DefinePlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const packageJson = require("./package.json");

module.exports = (env, argv) => {
  const isDev = process.env.NODE_ENV === "development";
  const isPreview = process.env.NODE_ENV === "preview";

  const pluginName = isDev
    ? `${packageJson.name} [DEV MODE]`
    : isPreview
    ? `${packageJson.name} [PREVIEW MODE]`
    : packageJson.name;
  const fileName = isDev
    ? `${packageJson.name}.dev.user.js`
    : isPreview
    ? `${packageJson.name}.preview.user.js`
    : `${packageJson.name}.user.js`;

  return {
    entry: "./src/main.js",
    output: {
      filename: fileName,
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
        "process.env.REPO": JSON.stringify(packageJson.repo),
        "process.env.UPDATEURL": JSON.stringify(packageJson.update),
      }),
      new BannerPlugin({
        banner: () => {
          const userscriptConfig = require("fs").readFileSync(
            "./userscript.config.js",
            "utf8"
          );
          const updatedUserscriptConfig = userscriptConfig
            .replace("__PLUGINNAME__", pluginName.toUpperCase())
            .replace("__DESCRIPTION__", packageJson.description)
            .replace("__VERSION__", packageJson.version)
            .replace("__REPO__", packageJson.repo.url)
            .replace("__ICON__", packageJson.icon)
            .replace("__UPDATEURL__", packageJson.update.url)
            .replace("__GREASYFORKURL__", packageJson.greasyfork)
            .replace("__SUPPORTURL__", packageJson.bugs.url);

          return updatedUserscriptConfig;
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
};
