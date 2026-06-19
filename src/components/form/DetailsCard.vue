<script setup lang="ts">
import { DETAIL_FIELDS } from "../../data/sections";
import CollapsibleCard from "./CollapsibleCard.vue";
import type { Resume } from "../../types";

const resume = defineModel<Resume>({ required: true });
</script>

<template>
  <CollapsibleCard id="details" title="Your Details">
    <div class="grid">
      <label v-for="f in DETAIL_FIELDS" :key="f.key">
        {{ f.label }}
        <input
          type="text"
          :placeholder="f.placeholder"
          v-model="resume[f.key]"
        />
      </label>
    </div>
  </CollapsibleCard>

  <CollapsibleCard id="summary" title="Professional Summary">
    <label class="full">
      Summary
      <textarea
        rows="4"
        placeholder="A concise 2-3 sentence overview of your experience and strengths."
        v-model="resume.summary"
      ></textarea>
    </label>
  </CollapsibleCard>
</template>
