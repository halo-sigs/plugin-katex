import { definePlugin } from "@halo-dev/console-shared";
import "katex/dist/katex.css";

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    "default:editor:extension:create": async () => {
      const { ExtensionKatexBlock, ExtensionKatexInline } = await import(
        "./editor/katex"
      );
      return [ExtensionKatexBlock, ExtensionKatexInline];
    },
  },
});
