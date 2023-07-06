import { definePlugin } from "@halo-dev/console-shared";
import { ExtensionKatexBlock, ExtensionKatexInline } from "@/editor/katex";

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    "default:editor:extension:create": () => {
      return [ExtensionKatexBlock, ExtensionKatexInline];
    },
  },
});
