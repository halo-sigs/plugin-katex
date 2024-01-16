import {
  Node,
  VueNodeViewRenderer,
  mergeAttributes,
  nodeInputRule,
  nodePasteRule,
  type ExtendedRegExpMatchArray,
  Editor,
  ToolboxItem,
  type Range,
} from "@halo-dev/richtext-editor";
import KaTeXInlineView from "./KaTeXInlineView.vue";
import KaTeXBlockView from "./KaTeXBlockView.vue";
import { markRaw } from "vue";
import TablerMath from "~icons/tabler/math";

export const inlineInputRegex = /(?:^|\s)((?:\$)((?:[^$]+))(?:\$))$/;
export const inlinePasteRegex = /(?:^|\s)((?:\$)((?:[^$]+))(?:\$))/g;
export const blockInputRegex = /^\$\$[\s\n]$/;
export const blockPasteRegex = /^\$\$((?:[^$]+))\$\$/g;

export const ExtensionKatexInline = Node.create({
  name: "katexInline",
  group: "inline math",
  inline: true,
  selectable: true,
  atom: true,
  allowGapCursor: false,
  code: true,

  addAttributes() {
    return {
      content: {
        default: "",
      },
      editMode: {
        default: false,
        rendered: false,
      },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      getToolboxItems({ editor }: { editor: Editor }) {
        return [
          {
            priority: 100,
            component: markRaw(ToolboxItem),
            props: {
              editor,
              icon: markRaw(TablerMath),
              title: "KaTeX 行内公式",
              action: () => {
                editor
                  .chain()
                  .focus()
                  .insertContent([{ type: "katexInline" }])
                  .run();
              },
            },
          },
        ];
      },
      getCommandMenuItems() {
        return {
          priority: 200,
          icon: markRaw(TablerMath),
          title: "KaTeX 行内公式",
          keywords: ["katex", "gongshi", "shuxuegongshi"],
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent([{ type: "katexInline" }])
              .run();
          },
        };
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[math-inline]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "math-inline": "" }),
      `${HTMLAttributes.content}`,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(KaTeXInlineView);
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inlineInputRegex,
        type: this.type,
        getAttributes: (match: ExtendedRegExpMatchArray) => {
          return {
            content: match[2],
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: inlinePasteRegex,
        type: this.type,
        getAttributes: (match: ExtendedRegExpMatchArray) => {
          return {
            content: match[2],
          };
        },
      }),
    ];
  },
});

export const ExtensionKatexBlock = Node.create({
  name: "katexBlock",
  group: "block math",
  selectable: true,
  defining: true,
  atom: true,
  allowGapCursor: true,
  code: true,

  addAttributes() {
    return {
      content: {
        default: "",
      },
      editMode: {
        default: false,
        rendered: false,
      },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      getToolboxItems({ editor }: { editor: Editor }) {
        return [
          {
            priority: 99,
            component: markRaw(ToolboxItem),
            props: {
              editor,
              icon: markRaw(TablerMath),
              title: "KaTeX 块级公式",
              action: () => {
                editor
                  .chain()
                  .focus()
                  .insertContent([{ type: "katexBlock" }])
                  .run();
              },
            },
          },
        ];
      },
      getCommandMenuItems() {
        return {
          priority: 200,
          icon: markRaw(TablerMath),
          title: "KaTeX 块级公式",
          keywords: ["katex", "gongshi", "shuxuegongshi"],
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent([{ type: "katexBlock" }])
              .run();
          },
        };
      },
      getDraggable() {
        return {
          getRenderContainer({ dom, view }) {
            console.log(dom);
            console.log(view);
            let container = dom;
            while (container && container.tagName !== "P") {
              container = container.parentElement as HTMLElement;
            }
            if (container) {
              container = container.firstElementChild
                ?.firstElementChild as HTMLElement;
            }
            let node;
            if (container.firstElementChild) {
              const pos = view.posAtDOM(container.firstElementChild, 0);
              const $pos = view.state.doc.resolve(pos);
              node = $pos.node();
            }

            return {
              node: node,
              el: container as HTMLElement,
            };
          },
          allowPropagationDownward: true,
        };
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[math-display]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "math-display": "" }),
      `${HTMLAttributes.content}`,
    ];
  },
  addNodeView() {
    return VueNodeViewRenderer(KaTeXBlockView);
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: blockInputRegex,
        type: this.type,
        getAttributes: () => {
          return {
            content: "",
            editMode: true,
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: blockPasteRegex,
        type: this.type,
        getAttributes: (match) => {
          return {
            content: match[1],
            editMode: false,
          };
        },
      }),
    ];
  },
});
