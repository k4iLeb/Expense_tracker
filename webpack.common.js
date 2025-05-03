const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: (pathData) => {
      const ext = path.extname(pathData.filename).toLowerCase();
      if ([".woff", ".woff2", ".eot", ".ttf", ".otf"].includes(ext)) {
        return "fonts/[hash][ext][query]";
      } else if ([".png", ".svg", ".jpg", ".jpeg", ".gif"].includes(ext)) {
        return "images/[hash][ext][query]";
      }
      return "[hash][ext][query]"; //default case if it is neither font nor image.
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
