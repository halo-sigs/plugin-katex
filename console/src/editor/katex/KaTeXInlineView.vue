<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { nodeViewProps, NodeViewWrapper } from "@halo-dev/richtext-editor";
import { VDropdown } from "@halo-dev/components";
import { renderKatex } from "./render-katex";

const props = defineProps(nodeViewProps);

const content = computed(() => {
  return props.node.attrs.content || "";
});

const renderedKatex = computed(() => {
  if (!content.value) {
    return "";
  }
  return renderKatex(content.value, true);
});

const showEditor = ref(false);

onMounted(() => {
  showEditor.value = props.node.attrs.editMode;
});

function onEditorChange(value: string) {
  console.log("value", value);
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
    <VDropdown
      :classes="['no-padding']"
      :distance="12"
      placement="bottom"
      :shown="showEditor"
    >
      <div class="katex-node-view-content-wrapper">
        <span
          v-if="node.attrs.content"
          contenteditable="false"
          v-html="renderedKatex"
        ></span>
        <span v-else> 添加LaTeX公式 </span>
      </div>
      <template #popper>
        <div class="katex-inline-view-code">
          <VCodemirror
            :model-value="content"
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
