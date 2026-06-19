<script setup lang="ts">
import type { RepeatSectionDef } from "../../data/sections";
import { emptyEntry } from "../../data/sections";
import CollapsibleCard from "./CollapsibleCard.vue";

interface Props {
  section: RepeatSectionDef;
}
const props = defineProps<Props>();

// Each entry is an object keyed by the section's field keys.
type Entry = Record<string, string>;
const entries = defineModel<Entry[]>({ required: true });

function add(): void {
  entries.value.unshift(emptyEntry(props.section.key) as Entry);
}

function remove(index: number): void {
  entries.value.splice(index, 1);
}
</script>

<template>
  <CollapsibleCard :id="section.key" :title="section.legend">
    <button type="button" class="btn btn--add" @click="add">
      + Add {{ section.addLabel }}
    </button>
    <div class="repeat-list">
      <div
        v-for="(entry, index) in entries"
        :key="index"
        class="entry"
      >
        <div class="entry__head">
          <span class="entry__label">{{ section.label }} {{ index + 1 }}</span>
          <button type="button" class="btn btn--remove" @click="remove(index)">
            Remove
          </button>
        </div>
        <div class="grid">
          <label
            v-for="field in section.fields"
            :key="field.key"
            :class="{ full: field.type === 'textarea' }"
          >
            {{ field.label }}
            <textarea
              v-if="field.type === 'textarea'"
              rows="3"
              :placeholder="field.placeholder"
              v-model="entry[field.key]"
            ></textarea>
            <input
              v-else
              type="text"
              :placeholder="field.placeholder"
              v-model="entry[field.key]"
            />
          </label>
        </div>
      </div>
    </div>
  </CollapsibleCard>
</template>
