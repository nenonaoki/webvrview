const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    webvrview: "./src/webvrview/index.ts",
    embed: "./src/embed/index.ts",
    player: "./src/player/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    host: '0.0.0.0',
    port: 8000,
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.ts$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {},
};