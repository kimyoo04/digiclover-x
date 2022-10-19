const {override, addWebpackAlias} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@app": path.resolve(__dirname, "src", "app"),
    "@components": path.resolve(__dirname, "src", "components"),
    "@constants": path.resolve(__dirname, "src", "constants"),
    "@controllers": path.resolve(__dirname, "src", "controllers"),
    "@features": path.resolve(__dirname, "src", "features"),
    "@hooks": path.resolve(__dirname, "src", "hooks"),
    "@public": path.resolve(__dirname, "src", "public"),
    "@routes": path.resolve(__dirname, "src", "routes"),
    "@services": path.resolve(__dirname, "src", "services"),
  })
);
