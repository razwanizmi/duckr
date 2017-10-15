import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const PATHS = {
  app: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "dist")
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = LAUNCH_COMMAND;

const isProduction = LAUNCH_COMMAND === "postinstall";

const productionPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html"
});

const base = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"]
  }
};

const developmentConfig = {
  devtool: "cheap-module-inline-source-map",
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};

const productionConfig = {
  devtool: "cheap-module-source-map",
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
};

const config = isProduction ? productionConfig : developmentConfig;

export default {
  ...base,
  ...config
};
