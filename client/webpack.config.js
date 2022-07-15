const path = require("path");
module.exports = {
  mode: "development",
  entry: { reg: "./src/reg.ts", login: "./src/login.ts", main: "./src/main.ts" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
