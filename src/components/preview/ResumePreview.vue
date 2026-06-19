<script setup lang="ts">
import { computed } from "vue";
import type { Resume } from "../../types";
import {
  linkHref,
  splitLines,
  splitSkills,
  datesText,
  entryHasContent,
} from "../../utils/format";

const props = defineProps<{ resume: Resume }>();

const r = computed(() => props.resume);

const contactParts = computed(() => {
  const s = r.value;
  const parts: { text: string; href?: string }[] = [];
  if (s.email) parts.push({ text: s.email, href: "mailto:" + s.email });
  if (s.phone) parts.push({ text: s.phone });
  if (s.location) parts.push({ text: s.location });
  if (s.linkedin) parts.push({ text: s.linkedin, href: linkHref(s.linkedin) });
  if (s.website) parts.push({ text: s.website, href: linkHref(s.website) });
  return parts;
});

const skills = computed(() => splitSkills(r.value.skills));
const experiences = computed(() => r.value.experience.filter(entryHasContent));
const educations = computed(() => r.value.education.filter(entryHasContent));
const projects = computed(() => r.value.projects.filter(entryHasContent));
const certifications = computed(() => r.value.certifications.filter(entryHasContent));
</script>

<template>
  <article class="resume">
    <header class="resume__header">
      <h1 class="resume__name">{{ r.fullName || "Your Name" }}</h1>
      <p v-if="r.title" class="resume__title">{{ r.title }}</p>
      <p v-if="contactParts.length" class="resume__contact">
        <template v-for="(part, i) in contactParts" :key="i">
          <span v-if="i > 0" class="resume__contact-sep"> &nbsp;•&nbsp; </span>
          <a v-if="part.href" :href="part.href">{{ part.text }}</a>
          <span v-else>{{ part.text }}</span>
        </template>
      </p>
    </header>

    <section v-if="r.summary.trim()" class="resume__section">
      <h2 class="resume__section-title">Summary</h2>
      <p class="resume__summary">{{ r.summary }}</p>
    </section>

    <section v-if="skills.length" class="resume__section">
      <h2 class="resume__section-title">Skills</h2>
      <ul class="resume__skills">
        <li v-for="(s, i) in skills" :key="i">{{ s }}</li>
      </ul>
    </section>

    <section v-if="experiences.length" class="resume__section">
      <h2 class="resume__section-title">Experience</h2>
      <div v-for="(e, i) in experiences" :key="i" class="r-entry">
        <div class="r-entry__top">
          <p class="r-entry__title">{{ e.title }}</p>
          <span class="r-entry__dates">{{ datesText(e.start, e.end) }}</span>
        </div>
        <p v-if="[e.company, e.location].filter(Boolean).length" class="r-entry__sub">
          {{ [e.company, e.location].filter(Boolean).join(", ") }}
        </p>
        <ul v-if="splitLines(e.bullets).length" class="r-entry__bullets">
          <li v-for="(b, bi) in splitLines(e.bullets)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="projects.length" class="resume__section">
      <h2 class="resume__section-title">Projects</h2>
      <div v-for="(p, i) in projects" :key="i" class="r-entry">
        <div class="r-entry__top">
          <p class="r-entry__title">{{ p.name }}</p>
          <a v-if="p.link" class="r-entry__link" :href="linkHref(p.link)">{{ p.link }}</a>
        </div>
        <p v-if="p.description" class="r-entry__desc">{{ p.description }}</p>
      </div>
    </section>

    <section v-if="certifications.length" class="resume__section">
      <h2 class="resume__section-title">Certifications</h2>
      <div v-for="(c, i) in certifications" :key="i" class="r-entry">
        <div class="r-entry__top">
          <p class="r-entry__title">{{ c.name }}</p>
        </div>
        <p v-if="[c.issuer, c.date].filter(Boolean).length" class="r-entry__sub">
          {{ [c.issuer, c.date].filter(Boolean).join(" · ") }}
        </p>
      </div>
    </section>

    <section v-if="educations.length" class="resume__section">
      <h2 class="resume__section-title">Education</h2>
      <div v-for="(e, i) in educations" :key="i" class="r-entry">
        <div class="r-entry__top">
          <p class="r-entry__title">{{ e.degree }}</p>
          <span class="r-entry__dates">{{ datesText(e.start, e.end) }}</span>
        </div>
        <p v-if="[e.school, e.location].filter(Boolean).length" class="r-entry__sub">
          {{ [e.school, e.location].filter(Boolean).join(", ") }}
        </p>
        <ul v-if="splitLines(e.notes).length" class="r-entry__bullets">
          <li v-for="(n, ni) in splitLines(e.notes)" :key="ni">{{ n }}</li>
        </ul>
      </div>
    </section>
  </article>
</template>
