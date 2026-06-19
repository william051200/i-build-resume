# Architecture

The app is a client-only **Vue 3 + Vite + TypeScript** single-page app. A single shared
reactive `Resume` object is the source of truth: the form edits it, the preview renders
from it, and a composable persists it to `localStorage` and handles import/export.

## Form vs. Preview

The editor is split into two halves that both work off the same reactive `resume` state:

- **`src/components/form/`** — the **left, editable panel**.
  - `DetailsCard.vue` renders the flat text inputs (name, title, contact, summary), bound
    with `v-model`.
  - `RepeatSection.vue` is a generic editor for the repeatable sections
    (experience / education / projects / certifications) with **+ Add** and **Remove**,
    driven by the field metadata in `src/data/sections.ts`.
  - `ResumeForm.vue` assembles these into the full form.
  - Typing mutates the shared reactive `resume`, which triggers auto-save and live preview
    updates.

- **`src/components/preview/ResumePreview.vue`** — the **right, read-only panel**.
  - Reactively renders the formatted resume "page" from the same `resume` state:
    header/contact, summary, experience, education, skills, projects, certifications.
  - Hides empty sections (`v-if`) and formats dates, links, and bullet/note lists.
  - This is exactly what gets printed when you export to PDF.

## Project structure

| File / folder                              | Purpose                                                        |
|--------------------------------------------|----------------------------------------------------------------|
| `index.html`                               | Vite entry; mounts the Vue app into `#app`                     |
| `vite.config.ts`                           | Vite + Vue plugin configuration                                |
| `tsconfig*.json`, `env.d.ts`               | TypeScript configuration                                       |
| `src/main.ts`                              | App entry — creates and mounts the Vue app, loads global CSS   |
| `src/App.vue`                              | Root layout: toolbar + form panel + preview panel             |
| `src/types/`                               | Typed resume data model — one type per file, re-exported from `index.ts` |
| `src/composables/useResume.ts`             | Shared reactive state: load/save (localStorage), import/export, load-sample, clear |
| `src/data/blank.ts` · `sample.ts`          | Blank and sample resume data                                  |
| `src/data/sections.ts`                     | Field metadata for the form (detail fields + repeatable sections) |
| `src/components/ToolBar.vue`               | Status + Load sample / Import / Export / Clear / Print buttons |
| `src/components/form/*.vue`                | Form: details card, generic repeatable section, form shell    |
| `src/components/preview/ResumePreview.vue` | Reactive live resume preview                                   |
| `src/utils/format.ts`                      | Pure text helpers (links, line/skill splitting, dates)        |
| `src/styles/main.css`                      | Global styling for screen, plus print rules for the PDF       |

### `src/types/`

The resume data model is split into one file per type, with a barrel `index.ts` that
re-exports them (so consumers can keep importing from `"../types"`):

| File                       | Type                |
|----------------------------|---------------------|
| `experienceEntry.ts`       | `ExperienceEntry`   |
| `educationEntry.ts`        | `EducationEntry`    |
| `projectEntry.ts`          | `ProjectEntry`      |
| `certificationEntry.ts`    | `CertificationEntry`|
| `resume.ts`                | `Resume`            |
| `repeatSectionKey.ts`      | `RepeatSectionKey`  |
| `simpleFieldKey.ts`        | `SimpleFieldKey`    |
| `index.ts`                 | barrel re-export    |
