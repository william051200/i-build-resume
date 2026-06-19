---
name: resume-pdf-to-json
description: >-
  Convert a resume (PDF, DOCX, or plain text) into the JSON file that the Resume
  Builder app imports. Use this when the user provides their resume as a file and
  wants it loaded into the app's sections. Reads the document, extracts the resume
  content, and writes a resume.json that matches the app's exact schema.
---

# Resume → Resume Builder JSON

Your job: take the user's resume document and produce a single `resume.json` file
that the **Resume Builder** app can import via its **Import JSON** button.

The app's import does a **full replace** of the resume, then auto-saves. So the JSON
you produce must be the complete resume — anything you leave out shows up as blank in
the app.

## Steps

1. **Read the user's resume.** It may be a PDF, DOCX, or pasted text.
   - If it's a PDF and you can't read it directly, extract the text first (e.g. with a
     PDF-to-text tool such as `pdftotext`, `pdfplumber`, or `pypdf`), then work from the
     extracted text.
2. **Extract the content** into the fields below. Do not invent facts — only use what is
   in the document. If something isn't present, use an empty string `""` (or an empty
   array `[]` for the list sections). Never use `null`.
3. **Write the result to `resume.json`** as valid JSON (UTF-8, 2-space indented).
4. **Validate** your output against `schema.json` in this folder (or at least re-read it
   to confirm every required key is present and every value is a string, except the four
   array sections). Compare your structure to `example.json`.
5. Tell the user to open the app and click **Import JSON**, then choose `resume.json`.

## Exact schema

Top-level object. **Every value is a string** except the four arrays. All keys should be
present (use `""` / `[]` when unknown):

| Key          | Type     | Notes                                              |
|--------------|----------|----------------------------------------------------|
| `fullName`   | string   | Person's full name                                 |
| `title`      | string   | Headline / current role, e.g. "Senior Engineer"    |
| `email`      | string   |                                                    |
| `phone`      | string   |                                                    |
| `location`   | string   | City, Country (or City, State)                     |
| `linkedin`   | string   | URL or handle, e.g. `linkedin.com/in/janedoe`      |
| `website`    | string   | Personal site / portfolio / GitHub profile         |
| `summary`    | string   | Professional summary paragraph                     |
| `skills`     | string   | **Single string**, comma-separated                 |
| `experience` | array    | of Experience entries (see below)                  |
| `education`  | array    | of Education entries                               |
| `projects`   | array    | of Project entries                                 |
| `certifications` | array | of Certification entries                          |

### Array entry shapes

**Experience** — one object per job:
`title`, `company`, `location`, `start`, `end`, `bullets`
- `start` / `end`: free-text dates, e.g. `"Jan 2021"`, `"2017"`, or `"Present"` for `end`.
- `bullets`: a **single string** with **one achievement per line**, separated by `\n`.

**Education** — one object per qualification:
`degree`, `school`, `location`, `start`, `end`, `notes`
- `notes`: a single string, one note per line (`\n`-separated). GPA, honors, coursework, etc.

**Project** — one object per project:
`name`, `link`, `description`

**Certification** — one object per certification:
`name`, `issuer`, `date`

## Important formatting rules

- **No `null`.** Missing text → `""`. Missing list → `[]`.
- **`skills` is one string**, not an array. Join skills with `", "`.
- **`bullets` and `notes` are single strings** with real newlines (`\n` in JSON), not arrays.
  Put each bullet/note on its own line.
- **Keep dates as written** in the resume; don't reformat them. Use `"Present"` for current roles.
- **Don't fabricate** emails, phone numbers, links, or dates that aren't in the document.
- Strip leading bullet characters (`•`, `-`, `*`) from each achievement line; the app
  renders bullets itself.
- The app ignores any extra/unknown keys, but prefer to emit exactly the keys above.

## How the app handles your file (for reference)

The importer (`normalize()` in `src/composables/useResume.ts`):
- Rejects the file if the top level isn't a JSON object.
- Starts from a blank resume and overlays your object — so **only the keys you provide are
  filled**; everything else is blank.
- Forces `experience`, `education`, `projects`, `certifications` to arrays (a non-array
  value there becomes `[]`).

## Files in this skill

- `schema.json` — JSON Schema (draft-07) for validation.
- `example.json` — a complete, valid sample `resume.json` to pattern-match against.

## Note on agent placement

This folder is portable. If your agent loads skills from a specific location (for example
`.claude/skills/`), copy or symlink `resume-pdf-to-json/` there.
