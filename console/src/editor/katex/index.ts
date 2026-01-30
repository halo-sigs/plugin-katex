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
  ExtensionOptions,
} from "@halo-dev/richtext-editor";
import KaTeXInlineView from "./KaTeXInlineView.vue";
import KaTeXBlockView from "./KaTeXBlockView.vue";
import { markRaw } from "vue";
import TablerMath from "~icons/tabler/math";
import { renderKatex } from "./render-katex";

export const inlineInputRegex = /(?:^|\s)((?:\$)((?:[^$]+))(?:\$))$/;
export const inlinePasteRegex = /(?:^|\s)((?:\$)((?:[^$]+))(?:\$))/g;
export const blockInputRegex = /^\$\$[\s\n]$/;
export const blockPasteRegex = /^\$\$((?:[^$]+))\$\$/g;

export const ExtensionKatexInline = Node.create<ExtensionOptions>({
  name: "katexInline",
  group: "inline math",
  inline: true,
  atom: true,
  code: true,

  addAttributes() {
    return {
      content: {
        default: "",
        rendered: false,
        isRequired: true,
        parseHTML: (element: HTMLElement) => {
          return findKatexRawContent(element);
        },
      },
      style: {
        default: "margin: 0 0.05em;",
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
      {
        tag: "span.katex-inline",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const content = node.attrs.content || "";

    try {
      const renderedHtml = renderKatex(content, true);

      const span = document.createElement("span");
      span.innerHTML = renderedHtml;

      const attributes = mergeAttributes(HTMLAttributes, {
        class: "katex-inline",
      });
      Object.entries(attributes).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          span.setAttribute(key, String(value));
        }
      });

      return { dom: span };
    } catch (error) {
      console.error("KaTeX render error:", error);
    }

    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "math-inline": "",
      }),
      content,
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

export const ExtensionKatexBlock = Node.create<ExtensionOptions>({
  name: "katexBlock",
  group: "block",
  selectable: true,
  defining: true,
  atom: true,
  allowGapCursor: true,
  code: true,

  addAttributes() {
    return {
      content: {
        default: "",
        rendered: false,
        isRequired: true,
        parseHTML: (element: HTMLElement) => {
          return findKatexRawContent(element);
        },
      },
      editMode: {
        default: false,
        rendered: false,
      },
      style: {
        default: "text-align: center; display: block; margin: 1em 0;",
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
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[math-display]",
        getAttrs: (element: HTMLElement) => {
          return {
            content: element.textContent,
          };
        },
      },
      {
        tag: "div.katex-block",
        getAttrs: (element: HTMLElement) => {
          return {
            content: element.textContent,
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const content = node.attrs.content || "";
    try {
      const renderedHtml = renderKatex(content, false);

      const div = document.createElement("div");
      div.innerHTML = renderedHtml;

      const attributes = mergeAttributes(HTMLAttributes, {
        class: "katex-block",
      });
      Object.entries(attributes).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          div.setAttribute(key, String(value));
        }
      });

      return { dom: div };
    } catch (error) {
      console.error("KaTeX render error:", error);
    }

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "math-display": "",
      }),
      content,
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

const findKatexRawContent = (element: HTMLElement) => {
  const annotation = element.querySelector("annotation");
  if (annotation) {
    return annotation.textContent;
  }

  if (element.hasAttribute("content")) {
    return element.getAttribute("content");
  }

  if (element.firstChild?.nodeType === 3) {
    return element.textContent;
  }

  return "";
};
