<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue";
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import katex from "katex";
import "katex/dist/katex.css";
import { Dropdown as VDropdown } from "floating-vue";

const props = defineProps(nodeViewProps);

const isBlock = props.node.type.name === "vueKatexBlock";

const renderedKatex = computed(() => {
  if (!props.node.attrs.content) {
    return "";
  }
  return katex.renderToString(props.node.attrs.content.toString(), {
    throwOnError: false,
    strict: false,
    displayMode: isBlock,
    maxSize: 300,
  });
});

const clickKatex = () => {
  props.editor.commands.setNodeSelection(props.getPos());
};

const katexNodeViewContentRef: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  if (props.node.attrs.editMode) {
    katexNodeViewContentRef.value?.click();
  }
});
</script>
<template>
  <node-view-wrapper
    class="katex-node-view"
    :as="isBlock ? 'div' : 'span'"
    contenteditable="false"
    :class="{ 'katex-node-view-selected': props.selected }"
  >
    <span
      class="katex-node-view-content-wrapper"
      :class="{
        'katex-node-view-content-wrapper-inline': !isBlock,
        'katex-node-view-content-wrapper-block': isBlock,
      }"
    >
      <VDropdown :distance="12" placement="bottom">
        <span
          ref="katexNodeViewContentRef"
          class="katex-node-view-content"
          @click="clickKatex"
        >
          <span
            v-if="node.attrs.content"
            class="katex-node-view-content"
            contenteditable="false"
            v-html="renderedKatex"
          />
          <span
            v-else
            class="katex-node-view-content-placeholder"
            :class="{
              'katex-display-placeholder': isBlock,
              'katex-inline-placeholder': !isBlock,
            }"
          >
            添加LaTeX公式
          </span>
        </span>
        <template #popper>
          <textarea
            :value="node.attrs.content"
            rows="3"
            class="katex-node-view-content-editor"
            placeholder="输入LaTeX公式"
            @input="updateAttributes({ content: $event.target.value })"
          />
        </template>
      </VDropdown>
    </span>
  </node-view-wrapper>
</template>
<style lang="scss">
.katex-node-view {
  cursor: pointer;
  padding: 0 0.25rem;
  transition: background 0.2s;
  --selected-bg: #ccc content-box;
}
.katex-node-view-selected {
  background: var(--selected-bg);
}
.katex-node-view-content-wrapper {
  &:hover {
    background: var(--selected-bg);
  }
}
.katex-node-view-content-wrapper-block {
  display: block;
}
.katex-node-view-content-wrapper-inline {
  display: inline-block;
}
.katex-node-view-content-placeholder {
  background: #f4f5f5;
  &:hover {
    background: var(--selected-bg);
  }
}
.katex-display-placeholder {
  display: block;
  margin: 1em 0;
  text-align: center;
}
.katex-inline-placeholder {
  display: inline-block;
}
</style>
