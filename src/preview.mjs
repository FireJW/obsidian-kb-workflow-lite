import { buildBacklinks } from "./wikilinks.mjs";

export function buildPreviewManifest(notes, options = {}) {
  const backlinks = buildBacklinks(notes);
  const sparseNotes = notes
    .filter((note) => (note.links ?? []).length === 0)
    .map((note) => note.slug);
  return {
    manifest_version: "kb-preview/v1",
    generated_at: options.generatedAt ?? new Date().toISOString(),
    write_mode: "preview-only",
    note_count: notes.length,
    link_count: notes.reduce((sum, note) => sum + (note.links ?? []).length, 0),
    sparse_notes: sparseNotes,
    backlinks: Object.fromEntries(backlinks.entries()),
  };
}
