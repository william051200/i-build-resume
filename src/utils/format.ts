/* Pure text helpers for rendering the preview. Vue escapes interpolation,
   so the old escapeHtml / toggleSection DOM helpers are no longer needed. */

export function linkHref(url: string): string {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : "https://" + url;
}

export function splitLines(text: string): string[] {
  return String(text || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitSkills(text: string): string[] {
  return String(text || "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function datesText(start: string, end: string): string {
  const s = (start || "").trim();
  const e = (end || "").trim();
  if (s && e) return s + " – " + e;
  return s || e || "";
}

export function entryHasContent(obj: object): boolean {
  return Object.values(obj).some((v) => String(v ?? "").trim() !== "");
}
