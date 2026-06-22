import type { Resume } from "../types";

/** A fresh, empty resume — the single source for "blank" shape. */
export function blankResume(): Resume {
  return {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    linkedinLabel: "",
    website: "",
    websiteLabel: "",
    summary: "",
    skills: "",
    experience: [],
    education: [],
    projects: [],
    certifications: [],
  };
}
