<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue";
import { nodeViewProps, NodeViewWrapper } from "@halo-dev/richtext-editor";
import katex from "katex";
import { VDropdown } from "@halo-dev/components";

const props = defineProps(nodeViewProps);

const renderedKatex = computed(() => {
  if (!props.node.attrs.content) {
    return "";
  }
  return katex.renderToString(props.node.attrs.content.toString(), {
    throwOnError: false,
    strict: false,
    displayMode: false,
    maxSize: 300,
  });
});

const clickKatex = () => {
  props.editor.commands.setNodeSelection(props.getPos());
};

const katexNodeViewContentRef = ref<Ref<HTMLElement | null>>();
onMounted(() => {
  if (props.node.attrs.editMode) {
    katexNodeViewContentRef.value?.click();
  }
});

function onEditorChange(value: string) {
  props.updateAttributes({ content: value });
}
</script>
<template>
  <node-view-wrapper
    class="katex-inline-container"
    as="span"
    contenteditable="false"
    :class="{ 'katex-node-view-selected': props.selected }"
  >
    <VDropdown :classes="['no-padding']" :distance="12" placement="bottom">
      <div
        ref="katexNodeViewContentRef"
        class="katex-node-view-content-wrapper"
        @click="clickKatex"
      >
        <span
          v-if="node.attrs.content"
          contenteditable="false"
          v-html="renderedKatex"
        />
        <span v-else> 添加LaTeX公式 </span>
      </div>
      <template #popper>
        <div class="katex-inline-view-code">
          <VCodemirror
            :model-value="node.attrs.content"
            height="180px"
            @change="onEditorChange"
          />
        </div>
      </template>
    </VDropdown>
  </node-view-wrapper>
</template>
<style>
.katex-inline-container {
  cursor: pointer;
  padding: 0 0.25rem;
  transition: background 0.2s;
  display: inline-block;
}

.katex-node-view-selected .katex-node-view-content-wrapper {
  background: #f2f2f2;
}

.katex-node-view-content-wrapper {
  background: #f6f5f5;
  display: inline-block;
  padding: 3px;
  border-radius: 3px;
  &:hover {
    background: #f2f2f2;
  }
}

.katex-inline-view-code {
  width: 300px;
}

.no-padding {
  padding: 0 !important;
}
</style>
