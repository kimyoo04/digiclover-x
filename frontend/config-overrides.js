const {override, addWebpackAlias} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@app": path.resolve(__dirname, "src", "app"),
    "@components": path.resolve(__dirname, "src", "components"),
    "@constants": path.resolve(__dirname, "src", "constants"),
    "@features": path.resolve(__dirname, "src", "features"),
    "@hooks": path.resolve(__dirname, "src", "hooks"),
    "@public": path.resolve(__dirname, "src", "public"),
    "@routes": path.resolve(__dirname, "src", "routes"),
    "@services": path.resolve(__dirname, "src", "services"),
    "@util": path.resolve(__dirname, "src", "util"),
  })
);

// "@app": ["./src/app/"],
// "@app/*": ["./src/app/*"],
// "@components": ["./src/components"],
// "@components/*": ["./src/components/*"],
// "@constants": ["./src/constants"],
// "@constants/*": ["./src/constants/*"],
// "@features": ["./src/features"],
// "@features/*": ["./src/features/*"],
// "@hooks": ["./src/hooks"],
// "@hooks/*": ["./src/hooks/*"],
// "@public": ["./src/public"],
// "@public/*": ["./src/public/*"],
// "@Routes": ["./src/Routes"],
// "@Routes/*": ["./src/Routes/*"],
// "@services": ["./src/services"],
// "@services/*": ["./src/services/*"]
