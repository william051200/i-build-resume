<script setup lang="ts">
import DetailsCard from "./DetailsCard.vue";
import RepeatSection from "./RepeatSection.vue";
import CollapsibleCard from "./CollapsibleCard.vue";
import { REPEAT_SECTIONS } from "../../data/sections";
import type { Resume } from "../../types";

const resume = defineModel<Resume>({ required: true });

const experience = REPEAT_SECTIONS.find((s) => s.key === "experience")!;
const education = REPEAT_SECTIONS.find((s) => s.key === "education")!;
const projects = REPEAT_SECTIONS.find((s) => s.key === "projects")!;
const certifications = REPEAT_SECTIONS.find((s) => s.key === "certifications")!;
</script>

<template>
  <form autocomplete="on" @submit.prevent>
    <DetailsCard v-model="resume" />

    <CollapsibleCard id="skills" title="Skills">
      <label class="full">
        Skills (separate with commas or new lines)
        <textarea
          rows="3"
          placeholder="JavaScript, Python, AWS, Leadership"
          v-model="resume.skills"
        ></textarea>
      </label>
    </CollapsibleCard>

    <RepeatSection :section="experience" v-model="resume.experience" />
    <RepeatSection :section="projects" v-model="resume.projects" />
    <RepeatSection :section="certifications" v-model="resume.certifications" />
    <RepeatSection :section="education" v-model="resume.education" />
  </form>
</template>
