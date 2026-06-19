import { reactive, ref, watch } from "vue";
import type { Resume } from "../types";
import { blankResume } from "../data/blank";
import { sampleResume } from "../data/sample";

const STORAGE_KEY = "resumeBuilder.data.v1";
const SECTION_KEYS = ["experience", "education", "projects", "certifications"] as const;

/** Whether the File System Access API is available (lets us write back to the opened file). */
const canUseFsAccess =
  typeof window !== "undefined" && typeof window.showOpenFilePicker === "function";

/** Coerce arbitrary parsed data into a valid Resume shape. */
function normalize(data: unknown): Resume {
  const base = blankResume();
  if (data && typeof data === "object" && !Array.isArray(data)) {
    Object.assign(base, data as Partial<Resume>);
  }
  SECTION_KEYS.forEach((k) => {
    if (!Array.isArray(base[k])) (base[k] as unknown) = [];
  });
  return base;
}

function loadFromStorage(): Resume {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : blankResume();
  } catch {
    return blankResume();
  }
}

/** Replace the contents of `target` in place so the reactive reference is kept. */
function assignInPlace(target: Resume, next: Resume): void {
  Object.assign(target, next);
}

const resume = reactive<Resume>(loadFromStorage());
const status = ref<string>("Loaded");

/** The file the user imported via the picker, so Save can write back to it. */
let fileHandle: FileSystemFileHandle | null = null;
const linkedFileName = ref<string>("");

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function save(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    status.value = "Saved";
  } catch {
    status.value = "Save failed";
  }
}

function scheduleSave(): void {
  if (saveTimer) clearTimeout(saveTimer);
  status.value = "Saving…";
  saveTimer = setTimeout(save, 350);
}

// Auto-save on any change to the resume.
watch(resume, scheduleSave, { deep: true });

function loadSample(): void {
  assignInPlace(resume, sampleResume());
  scheduleSave();
}

function clear(): void {
  assignInPlace(resume, blankResume());
  save();
  status.value = "Cleared";
}

function exportJson(): void {
  const json = JSON.stringify(resume, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  status.value = "Exported";
}

function importJson(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    if (applyImportedText(String(reader.result))) {
      // Imported via the plain file input — no writable handle available.
      fileHandle = null;
      linkedFileName.value = "";
      status.value = "Imported";
    }
  };
  reader.onerror = () => {
    window.alert("Could not read the selected file.");
    status.value = "Import failed";
  };
  reader.readAsText(file);
}

/** Parse + apply imported JSON text. Returns true on success. */
function applyImportedText(text: string): boolean {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    window.alert("Could not import: the file is not valid JSON.");
    status.value = "Import failed";
    return false;
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    window.alert("Could not import: the file must contain a resume object.");
    status.value = "Import failed";
    return false;
  }
  assignInPlace(resume, normalize(parsed));
  save();
  return true;
}

/** Import via the File System Access API, remembering the file so Save can write back. */
async function importFromPicker(): Promise<void> {
  if (!window.showOpenFilePicker) return;
  try {
    const [handle] = await window.showOpenFilePicker({
      multiple: false,
      types: [
        { description: "JSON", accept: { "application/json": [".json"] } },
      ],
    });
    const file = await handle.getFile();
    const text = await file.text();
    if (applyImportedText(text)) {
      fileHandle = handle;
      linkedFileName.value = handle.name;
      status.value = `Imported ${handle.name}`;
    }
  } catch (err) {
    // The user cancelling the picker throws AbortError — not a real failure.
    if ((err as DOMException)?.name !== "AbortError") {
      status.value = "Import failed";
    }
  }
}

/** Write the current resume back to the imported file, or download if none is linked. */
async function saveToFile(): Promise<void> {
  if (!fileHandle) {
    exportJson();
    return;
  }
  try {
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(resume, null, 2));
    await writable.close();
    status.value = `Saved to ${linkedFileName.value}`;
  } catch {
    status.value = "Save to file failed";
  }
}

/** Shared resume store + actions. Single instance across the app. */
export function useResume() {
  return {
    resume,
    status,
    canUseFsAccess,
    linkedFileName,
    loadSample,
    clear,
    exportJson,
    importJson,
    importFromPicker,
    saveToFile,
  };
}
