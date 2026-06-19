import type {
  RepeatSectionKey,
  SimpleFieldKey,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  CertificationEntry,
} from "../types";

export interface SimpleFieldDef {
  key: SimpleFieldKey;
  label: string;
  placeholder: string;
  type?: "textarea";
  /** spans both grid columns */
  full?: boolean;
}

export interface RepeatFieldDef {
  key: string;
  label: string;
  placeholder: string;
  type?: "textarea";
}

export interface RepeatSectionDef {
  key: RepeatSectionKey;
  /** plural section heading, e.g. "Experience", "Projects" */
  legend: string;
  /** singular label shown per entry, e.g. "Experience 1" */
  label: string;
  /** add-button noun */
  addLabel: string;
  fields: RepeatFieldDef[];
}

/** Flat text fields bound directly to the resume (Details + Summary + Skills). */
export const DETAIL_FIELDS: SimpleFieldDef[] = [
  { key: "fullName", label: "Full name", placeholder: "Jane Doe" },
  { key: "title", label: "Professional title", placeholder: "Senior Software Engineer" },
  { key: "email", label: "Email", placeholder: "jane@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1 555 123 4567" },
  { key: "location", label: "Location", placeholder: "City, Country" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/janedoe" },
  { key: "website", label: "Website / Portfolio", placeholder: "janedoe.dev" },
];

/** Definitions for each repeatable section + its per-entry fields. */
export const REPEAT_SECTIONS: RepeatSectionDef[] = [
  {
    key: "experience",
    legend: "Experience",
    label: "Experience",
    addLabel: "experience",
    fields: [
      { key: "title", label: "Job title", placeholder: "Senior Software Engineer" },
      { key: "company", label: "Company", placeholder: "Acme Corp" },
      { key: "location", label: "Location", placeholder: "City, Country" },
      { key: "start", label: "Start", placeholder: "Jan 2020" },
      { key: "end", label: "End", placeholder: "Present" },
      { key: "bullets", label: "Achievements (one per line)", placeholder: "Led migration to AWS, cutting costs 30%", type: "textarea" },
    ],
  },
  {
    key: "education",
    legend: "Education",
    label: "Education",
    addLabel: "education",
    fields: [
      { key: "degree", label: "Degree", placeholder: "B.Sc. Computer Science" },
      { key: "school", label: "School", placeholder: "State University" },
      { key: "location", label: "Location", placeholder: "City, Country" },
      { key: "start", label: "Start", placeholder: "2016" },
      { key: "end", label: "End", placeholder: "2020" },
      { key: "notes", label: "Notes (one per line)", placeholder: "GPA 3.9 / Dean's List", type: "textarea" },
    ],
  },
  {
    key: "projects",
    legend: "Projects",
    label: "Project",
    addLabel: "project",
    fields: [
      { key: "name", label: "Project name", placeholder: "Open Source CLI" },
      { key: "link", label: "Link", placeholder: "github.com/you/project" },
      { key: "description", label: "Description", placeholder: "What it does and your role.", type: "textarea" },
    ],
  },
  {
    key: "certifications",
    legend: "Certifications",
    label: "Certification",
    addLabel: "certification",
    fields: [
      { key: "name", label: "Certification", placeholder: "AWS Solutions Architect" },
      { key: "issuer", label: "Issuer", placeholder: "Amazon Web Services" },
      { key: "date", label: "Date", placeholder: "2023" },
    ],
  },
];

type EntryFor = {
  experience: ExperienceEntry;
  education: EducationEntry;
  projects: ProjectEntry;
  certifications: CertificationEntry;
};

/** Build an empty entry object for a given repeatable section. */
export function emptyEntry<K extends RepeatSectionKey>(sectionKey: K): EntryFor[K] {
  const section = REPEAT_SECTIONS.find((s) => s.key === sectionKey)!;
  const obj: Record<string, string> = {};
  section.fields.forEach((f) => {
    obj[f.key] = "";
  });
  return obj as unknown as EntryFor[K];
}
