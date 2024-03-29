<script lang="ts" setup>
import { NodeViewWrapper, nodeViewProps } from "@halo-dev/richtext-editor";
import katex from "katex";
import { computed } from "vue";
import IcOutlineTipsAndUpdates from "~icons/ic/outline-tips-and-updates";
import IcOutlineFullscreen from "~icons/ic/outline-fullscreen";
import IcOutlineFullscreenExit from "~icons/ic/outline-fullscreen-exit";
import { ref } from "vue";

const props = defineProps(nodeViewProps);

const renderedKatex = computed(() => {
  if (!props.node.attrs.content) {
    return "";
  }
  return katex.renderToString(props.node.attrs.content.toString(), {
    throwOnError: false,
    strict: false,
    displayMode: true,
    maxSize: 300,
  });
});

const fullscreen = ref(false);

function onEditorChange(value: string) {
  props.updateAttributes({ content: value });
}
</script>

<template>
  <node-view-wrapper
    class="katex-block-container"
    :class="{ 'katex-block-fullscreen': fullscreen }"
    as="div"
  >
    <div class="katex-block-nav">
      <div class="katex-block-nav-start">
        <div>KaTeX 公式</div>
        <a
          v-tooltip="`查阅 KaTeX 的文档`"
          href="https://katex.org/"
          target="_blank"
        >
          <IcOutlineTipsAndUpdates />
        </a>
      </div>
      <div class="katex-block-nav-end">
        <div
          class="katex-block-fullscreen-icon"
          @click="fullscreen = !fullscreen"
        >
          <IcOutlineFullscreenExit v-if="fullscreen" v-tooltip="'退出全屏'" />
          <IcOutlineFullscreen v-else v-tooltip="'全屏'" />
        </div>
      </div>
    </div>
    <div class="katex-block-editor-panel">
      <div class="katex-block-code">
        <VCodemirror
          :model-value="node.attrs.content"
          height="100%"
          @change="onEditorChange"
        />
      </div>
      <div
        ref="previewRef"
        class="katex-block-preview"
        v-html="renderedKatex"
      ></div>
    </div>
  </node-view-wrapper>
</template>

<style>
.katex-block-container {
  border: 1px #e7e7e7 solid;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.75em;
}

.katex-block-nav {
  border-bottom: 1px #e7e7e7 solid;
  display: flex;
  padding: 5px 10px;
  align-items: center;
}

.katex-block-nav-start {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.katex-block-nav-end {
  justify-content: flex-end;
}

.katex-block-editor-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
}

.katex-block-code {
  height: 100%;
  border-right: 1px #e7e7e7 solid;
}

.katex-block-preview {
  padding: 5px;
  height: 100%;
}

.katex-block-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: #fff;
  margin-top: 0;
}

.katex-block-fullscreen-icon {
  cursor: pointer;
}

.katex-block-fullscreen-icon svg {
  font-size: 18px;
}

.katex-block-fullscreen-icon:hover {
  color: #999;
}
</style>
