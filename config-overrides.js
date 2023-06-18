const path = require('path');

module.exports = function override(config) {
  // Add resolve fallback options
  config.resolve.fallback = {
    assert: require.resolve('assert/'),
    fs: require.resolve('fs'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    stream: require.resolve('stream-browserify'),
    tty: require.resolve('tty-browserify'),
    url: require.resolve('url/'),
    zlib: require.resolve('browserify-zlib'),
  };

  return config;
};