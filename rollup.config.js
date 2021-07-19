import path from "path";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
// import url from "@rollup/plugin-url";
import { RollupOptions } from "rollup";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import browsersync from "rollup-plugin-browsersync";
// import html from "@rollup/plugin-html";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import pkg from "./package.json";

/** @type {RollupOptions} */
const options = {
  input: "src/index",
  // external: Object.keys(pkg.dependencies),
  output: {
    sourcemap: true,
    dir: "./dist/",
    format: "es",
  },
  preserveEntrySignatures: "strict",
  plugins: [
    typescript(),
    resolve({
      mainFields: ["jsnext:main"],
      extensions: [".ts", ".js"],
    }),
    optimizeLodashImports(),
    del({ targets: ["./dist/**/*", "!./dist/public/Cesium"] }),
    json(),
    postcss({
      // extract: "app.min.css",
      sourcemap: true,
      // config: require("./postcss.config"),
    }),
    babel({
      exclude: "node_modules/**",
    }),
    // url(),
    // alias({
    // entries: [
    // { find: "react", replacement: "preact/compat" },
    // { find: "react-dom", replacement: "preact/compat" },
    // ],
    // }),
    copy({
      targets: [
        {
          src: "node_modules/cesium/Build/Cesium/Workers/",
          dest: "./dist/public/Cesium",
        },
        {
          src: "node_modules/cesium/Build/Cesium/ThirdParty/",
          dest: "./dist/public/Cesium",
        },
        {
          src: "node_modules/cesium/Build/Cesium/Assets/",
          dest: "./dist/public/Cesium",
        },
        {
          src: "node_modules/cesium/Build/Cesium/Widgets/",
          dest: "./dist/public/Cesium",
        },
        {
          src: "src/index.html",
          dest: "./dist/",
        },
      ],
      // copyOnce: true,
    }),
    // html({ template }),
    browsersync({ server: "dist", open: false }),
  ],
};
export default options;
