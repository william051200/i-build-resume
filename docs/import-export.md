# Import / Export (JSON)

You can load your resume from a file so it auto-fills every section, and save it back
out as a file. The format is **JSON** matching the app's data shape.

- **Export JSON** — downloads your current resume as `resume.json`.
- **Import JSON** — pick a `.json` file; it **replaces** the whole resume (then auto-saves).
  An invalid file is rejected and your current data is left unchanged.

## Easiest workflow

You don't have to write JSON by hand:

1. Click **Load sample** (or just use your current data), then **Export JSON**.
2. Open the downloaded `resume.json` in any text editor and replace the values with yours.
3. Click **Import JSON** and choose your edited file — every section fills in automatically.

## Convert a PDF with an AI agent

Already have a resume as a PDF (or DOCX)? Use the bundled **Agent Skill** at
[`.github/skills/resume-pdf-to-json/`](../.github/skills/resume-pdf-to-json/SKILL.md) to have an AI agent
convert it for you:

1. Load the skill folder into your AI agent (Claude / Copilot-style skills).
2. Give the agent your resume file and ask it to convert it to the app's JSON.
3. The agent writes a `resume.json` matching the schema (it can validate against the
   bundled `schema.json`).
4. Click **Import JSON** in the app and choose the produced file.

The skill folder contains the full instructions (`SKILL.md`), a JSON Schema for validation
(`schema.json`), and a complete example output (`example.json`).

## File format

```json
{
  "fullName": "Jane Doe",
  "title": "Senior Software Engineer",
  "email": "jane@example.com",
  "phone": "+1 555 123 4567",
  "location": "City, Country",
  "linkedin": "linkedin.com/in/janedoe",
  "website": "janedoe.dev",
  "summary": "A concise overview...",
  "skills": "JavaScript, Python, AWS, Leadership",
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "Acme Corp",
      "location": "City, Country",
      "start": "Jan 2020",
      "end": "Present",
      "bullets": "Led migration to AWS, cutting costs 30%.\nMentored 5 engineers."
    }
  ],
  "education": [
    { "degree": "B.Sc. Computer Science", "school": "State University", "location": "City, Country", "start": "2016", "end": "2020", "notes": "GPA 3.9 / Dean's List" }
  ],
  "projects": [
    { "name": "Open Source CLI", "link": "github.com/you/project", "description": "What it does and your role." }
  ],
  "certifications": [
    { "name": "AWS Solutions Architect", "issuer": "Amazon Web Services", "date": "2023" }
  ]
}
```

Notes:

- `skills` is a single string (separate entries with commas or new lines).
- `bullets` (experience) and `notes` (education) are single strings — put each line on its
  own line using `\n`.
- The four list sections (`experience`, `education`, `projects`, `certifications`) are
  arrays — add as many objects as you need. Missing or extra keys are handled gracefully.
