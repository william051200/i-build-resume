import type { ExperienceEntry } from "./experienceEntry";
import type { EducationEntry } from "./educationEntry";
import type { ProjectEntry } from "./projectEntry";
import type { CertificationEntry } from "./certificationEntry";

export interface Resume {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
}
