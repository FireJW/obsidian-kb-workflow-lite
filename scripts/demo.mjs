#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadNotes } from "../src/notes.mjs";
import { buildPreviewManifest } from "../src/preview.mjs";
import { searchNotes } from "../src/search.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const fixtureRoot = path.join(repoRoot, "fixtures", "notes");
const query = process.argv.slice(2).join(" ") || "retrieval workflow";

const notes = loadNotes(fixtureRoot);
const results = searchNotes(notes, query, { limit: 5 });
const manifest = buildPreviewManifest(notes, { generatedAt: "2026-01-01T00:00:00.000Z" });

console.log(JSON.stringify({ query, results, manifest }, null, 2));
