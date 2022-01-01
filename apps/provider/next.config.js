const config = require("../../next.config");

const withTM = require("next-transpile-modules")([
  "@kiebitz-oss/config",
  "@kiebitz-oss/api",
  "@kiebitz-oss/ui",
]);

module.exports = withTM(config);
