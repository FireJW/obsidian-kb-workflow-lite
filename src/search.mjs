export function searchNotes(notes, query, options = {}) {
  const terms = tokenize(query);
  const limit = Number(options.limit ?? 5);
  if (terms.length === 0) return [];
  return notes
    .map((note) => ({ note, score: scoreNote(note, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.note.title.localeCompare(b.note.title))
    .slice(0, limit)
    .map(({ note, score }) => ({
      title: note.title,
      path: note.path,
      score,
      tags: note.tags,
      links: note.links,
      excerpt: excerpt(note.body, terms),
    }));
}

export function tokenize(query) {
  return String(query ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function scoreNote(note, terms) {
  const title = note.title.toLowerCase();
  const body = note.body.toLowerCase();
  const tags = note.tags.join(" ").toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 5;
    if (tags.includes(term)) score += 3;
    if (body.includes(term)) score += 1;
  }
  return score;
}

function excerpt(body, terms) {
  const text = String(body ?? "").replace(/\s+/g, " ").trim();
  const lower = text.toLowerCase();
  const first = terms.map((term) => lower.indexOf(term)).filter((index) => index >= 0).sort()[0];
  if (first === undefined) return text.slice(0, 160);
  const start = Math.max(0, first - 60);
  return text.slice(start, start + 180);
}
