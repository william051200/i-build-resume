# Resume Builder

A simple, professional, browser-based resume builder built with **Vue 3 + Vite +
TypeScript**. Fill in a form, see a live preview, and export to PDF.

**▶ [Live demo](https://william051200.github.io/i-build-resume/)** — try it now, no install required.

Your data is automatically saved in your browser so you can come back later and
**update** your resume anytime.

## Getting started

You can use the **[hosted version](https://william051200.github.io/i-build-resume/)**
directly in your browser. To run it locally for development:

Requires **Node.js 18+** and npm.

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the Vite dev server
```

Open the URL Vite prints (e.g. `http://localhost:5173/`) in any modern browser.

Other scripts:

```bash
npm run build      # type-check (vue-tsc) + production build into dist/
npm run preview    # locally preview the production build
npm run type-check # type-check only
```

## Documentation

- [Features](docs/features.md) — tech stack and the full feature list.
- [Usage guide](docs/usage.md) — how to fill in the form, update your resume later, and start over.
- [Export to PDF](docs/printing.md) — printing your resume to a clean PDF.
- [Import / Export (JSON)](docs/import-export.md) — load a resume from a file and save it back out, with the file format.
- [Architecture](docs/architecture.md) — project structure plus how the form and preview fit together.

Have a resume PDF? The bundled [PDF → JSON agent skill](.github/skills/resume-pdf-to-json/SKILL.md)
lets an AI agent convert it into a file you can **Import JSON**.

## Privacy

Everything runs locally in your browser. No data is uploaded anywhere.
