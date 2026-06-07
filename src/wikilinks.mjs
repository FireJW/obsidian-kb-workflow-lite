const WIKILINK_RE = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g;

export function extractWikilinks(markdown) {
  const links = [];
  const seen = new Set();
  for (const match of String(markdown ?? "").matchAll(WIKILINK_RE)) {
    const target = match[1].trim();
    const key = target.toLowerCase();
    if (!target || seen.has(key)) continue;
    seen.add(key);
    links.push(target);
  }
  return links;
}

export function buildBacklinks(notes) {
  const backlinks = new Map();
  for (const note of notes) {
    for (const target of note.links ?? []) {
      const key = target.toLowerCase();
      const list = backlinks.get(key) ?? [];
      list.push(note.slug);
      backlinks.set(key, list);
    }
  }
  return backlinks;
}
