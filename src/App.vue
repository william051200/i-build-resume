<script setup lang="ts">
import ToolBar from "./components/ToolBar.vue";
import ResumeForm from "./components/form/ResumeForm.vue";
import ResumePreview from "./components/preview/ResumePreview.vue";
import { useResume } from "./composables/useResume";

const { resume } = useResume();
</script>

<template>
  <ToolBar />
  <main class="layout">
    <section class="form-panel no-print" aria-label="Resume details form">
      <ResumeForm v-model="resume" />
    </section>
    <section class="preview-panel" aria-label="Resume preview">
      <ResumePreview :resume="resume" />
    </section>
  </main>
</template>
