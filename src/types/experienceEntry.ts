export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string; // one achievement per line
  [key: string]: string;
}
