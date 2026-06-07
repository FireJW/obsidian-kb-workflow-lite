import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { loadNotes } from "../src/notes.mjs";
import { buildPreviewManifest } from "../src/preview.mjs";
import { searchNotes } from "../src/search.mjs";
import { extractWikilinks } from "../src/wikilinks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureRoot = path.resolve(__dirname, "..", "fixtures", "notes");

test("extractWikilinks returns unique normalized targets", () => {
  assert.deepEqual(
    extractWikilinks("[[Alpha]] [[Beta|label]] [[Alpha]] [[Gamma#section]]"),
    ["Alpha", "Beta", "Gamma"],
  );
});

test("loadNotes, searchNotes, and buildPreviewManifest work together", () => {
  const notes = loadNotes(fixtureRoot);
  const results = searchNotes(notes, "retrieval workflow", { limit: 2 });
  const manifest = buildPreviewManifest(notes, {
    generatedAt: "2026-01-01T00:00:00.000Z",
  });

  assert.equal(notes.length, 3);
  assert.equal(results[0].title, "Retrieval Workflow");
  assert.equal(manifest.manifest_version, "kb-preview/v1");
  assert.equal(manifest.write_mode, "preview-only");
  assert.equal(manifest.note_count, 3);
  assert.deepEqual(manifest.backlinks["preview manifest"], ["retrieval-workflow"]);
});
