const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === true,
});
const withPreact = require("next-plugin-preact")({
  experimental: {
    esmExternals: false,
  },
});

module.exports = withPlugins([
  [withBundleAnalyzer, withPreact],
  // your other plugins here
]);
