<script setup lang="ts">
import { computed } from "vue";
import { useCollapsedSections } from "../../composables/useCollapsedSections";

interface Props {
  id: string;
  title: string;
}
const props = defineProps<Props>();

const { isCollapsed, toggle } = useCollapsedSections();

const collapsed = computed(() => isCollapsed(props.id));
const bodyId = computed(() => `collapsible-body-${props.id}`);
</script>

<template>
  <section class="card card--collapsible" :class="{ 'is-collapsed': collapsed }">
    <button
      type="button"
      class="card__header"
      :aria-expanded="!collapsed"
      :aria-controls="bodyId"
      @click="toggle(id)"
    >
      <span class="card__title">{{ title }}</span>
      <span class="card__chevron" aria-hidden="true"></span>
    </button>
    <div :id="bodyId" v-show="!collapsed" class="card__body">
      <slot />
    </div>
  </section>
</template>
