// ⚠️ IMPORTANT: Using rspack to build Halo plugins is just an attempt by the Halo team.
// Currently, it is still recommended to refer to https://github.com/halo-dev/plugin-starter
// Using Vite

import { defineConfig } from "@rspack/cli";
import rspack from "@rspack/core";
import path from "path";
import process from "process";
import Icons from "unplugin-icons/rspack";
import { fileURLToPath } from "url";
import { VueLoaderPlugin } from "vue-loader";

const isProduction = process.env.NODE_ENV === "production";
const dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = isProduction
  ? "../src/main/resources/console"
  : "../build/resources/main/console";

export default defineConfig({
  mode: isProduction ? "production" : "development",
  entry: {
    main: "./src/index.ts",
  },
  plugins: [
    new VueLoaderPlugin(),
    Icons({
      compiler: "vue3",
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "./node_modules/katex/dist",
          to: "../static",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "/plugins/plugin-katex/assets/console/",
    chunkFilename: "[id]-[hash:8].js",
    cssFilename: "style.css",
    path: path.resolve(outDir),
    library: {
      type: "window",
      export: "default",
      name: "plugin-katex",
    },
    clean: true,
    iife: true,
  },
  optimization: {
    providedExports: false,
    realContentHash: true,
  },
  devtool: false,
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
    ],
  },
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    "@vueuse/core": "VueUse",
    "@vueuse/components": "VueUse",
    "@vueuse/router": "VueUse",
    "@halo-dev/console-shared": "HaloConsoleShared",
    "@halo-dev/components": "HaloComponents",
    "@halo-dev/api-client": "HaloApiClient",
    "@halo-dev/richtext-editor": "RichTextEditor",
    axios: "axios",
  },
});
