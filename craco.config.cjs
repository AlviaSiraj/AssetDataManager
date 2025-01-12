import path from "path";

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        fs: require.resolve("fs-browserify"),
      };
      return webpackConfig;
    },
  },
};
