import katex from "katex";

export function renderKatex(content: string, isInline: boolean) {
  return katex.renderToString(content, {
    throwOnError: false,
    strict: false,
    displayMode: !isInline,
    maxSize: 300,
    output: "mathml",
  });
}
