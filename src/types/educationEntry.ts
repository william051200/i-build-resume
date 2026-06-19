export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  notes: string; // one note per line
  [key: string]: string;
}
