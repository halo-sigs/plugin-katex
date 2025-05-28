import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { viteStaticCopy as ViteStaticCopy } from "vite-plugin-static-copy";
import { HaloUIPluginBundlerKit } from "@halo-dev/ui-plugin-bundler-kit";

export default defineConfig({
  plugins: [
    Vue(),
    Icons({ compiler: "vue3" }),
    ViteStaticCopy({
      targets: [
        {
          src: `./node_modules/katex/dist/*`,
          dest: "../static",
        },
      ],
    }),
    HaloUIPluginBundlerKit(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
