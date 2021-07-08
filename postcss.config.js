module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
    // require("postcss-modules")({
    // generateScopedName: "[name]__[local]-[hash:base64:5]",
    // globalModulePaths: ["./site/local/templates/Leggis/assets/css"],
    // }),
  ],
};

