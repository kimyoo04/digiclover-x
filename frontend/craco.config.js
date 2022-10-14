const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        rootUrl: ".",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.extends.json",
      },
    },
  ],
};
