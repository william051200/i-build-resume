<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useResume } from "../composables/useResume";

const { status, canUseFsAccess, linkedFileName, loadSample, clear, exportJson, importJson, importFromPicker, saveToFile } =
  useResume();

const fileInput = ref<HTMLInputElement | null>(null);

const menuOpen = ref(false);
const menuRoot = ref<HTMLElement | null>(null);

function toggleMenu(): void {
  menuOpen.value = !menuOpen.value;
}

function closeMenu(): void {
  menuOpen.value = false;
}

/** Close the menu, then run the chosen action. */
function run(action: () => void): void {
  closeMenu();
  action();
}

function onDocumentClick(event: MouseEvent): void {
  if (menuOpen.value && menuRoot.value && !menuRoot.value.contains(event.target as Node)) {
    closeMenu();
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") closeMenu();
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});

function onClear(): void {
  if (window.confirm("Clear your resume content? This cannot be undone.")) clear();
}

function onLoadSample(): void {
  if (window.confirm("Load sample data? This replaces your current entries.")) loadSample();
}

function onImportClick(): void {
  if (canUseFsAccess) {
    void importFromPicker();
  } else {
    fileInput.value?.click();
  }
}

function onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) importJson(file);
  input.value = "";
}

function print(): void {
  window.print();
}
</script>

<template>
  <header class="toolbar no-print">
    <h1 class="toolbar__title">Resume Builder</h1>
    <div class="toolbar__actions">
      <span class="save-status" aria-live="polite">{{ status }}</span>
      <button type="button" class="btn btn--primary" @click="print">Print</button>

      <div class="menu" ref="menuRoot">
        <button
          type="button"
          class="btn btn--ghost menu__toggle"
          :aria-expanded="menuOpen"
          aria-haspopup="true"
          aria-controls="toolbar-menu"
          title="More actions"
          @click.stop="toggleMenu"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span class="visually-hidden">More actions</span>
        </button>

        <div v-if="menuOpen" id="toolbar-menu" class="menu__panel" role="menu" @click.stop>
          <p
            v-if="linkedFileName"
            class="menu__file"
            :title="`Save writes to ${linkedFileName}`"
          >
            Linked: {{ linkedFileName }}
          </p>
          <button type="button" role="menuitem" class="menu__item" @click="run(onLoadSample)">
            Load sample
          </button>
          <button type="button" role="menuitem" class="menu__item" @click="run(onImportClick)">
            Import JSON
          </button>
          <button type="button" role="menuitem" class="menu__item" @click="run(exportJson)">
            Export JSON
          </button>
          <button type="button" role="menuitem" class="menu__item" @click="run(saveToFile)">
            Save
          </button>
          <button
            type="button"
            role="menuitem"
            class="menu__item menu__item--danger"
            @click="run(onClear)"
          >
            Clear saved data
          </button>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept="application/json,.json"
        class="visually-hidden"
        aria-hidden="true"
        tabindex="-1"
        @change="onFileChange"
      />
    </div>
  </header>
</template>
