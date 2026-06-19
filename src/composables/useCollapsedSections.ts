import { reactive, watch } from "vue";

const STORAGE_KEY = "resumeBuilder.collapsed.v1";

/** Load the collapsed-state map from storage, ignoring malformed data. */
function loadFromStorage(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const map: Record<string, boolean> = {};
      Object.entries(parsed as Record<string, unknown>).forEach(([k, v]) => {
        if (typeof v === "boolean") map[k] = v;
      });
      return map;
    }
  } catch {
    /* ignore */
  }
  return {};
}

const collapsed = reactive<Record<string, boolean>>(loadFromStorage());

watch(
  collapsed,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
    } catch {
      /* ignore */
    }
  },
  { deep: true },
);

/** Shared collapsed-state store for form sections. Single instance across the app. */
export function useCollapsedSections() {
  function isCollapsed(id: string): boolean {
    return collapsed[id] === true;
  }
  function toggle(id: string): void {
    collapsed[id] = !collapsed[id];
  }
  return { isCollapsed, toggle };
}
