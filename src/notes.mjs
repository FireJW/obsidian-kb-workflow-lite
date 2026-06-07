import fs from "node:fs";
import path from "node:path";

import { parseFrontmatter } from "./frontmatter.mjs";
import { extractWikilinks } from "./wikilinks.mjs";

export function loadNotes(rootDir) {
  const files = walkMarkdown(rootDir);
  return files.map((filePath) => {
    const markdown = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(markdown);
    const relativePath = path.relative(rootDir, filePath).replaceAll(path.sep, "/");
    const title = parsed.data.title || path.basename(filePath, ".md");
    return {
      title,
      slug: slugify(title),
      path: relativePath,
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
      status: parsed.data.status || "draft",
      body: parsed.body,
      links: extractWikilinks(parsed.body),
    };
  });
}

function walkMarkdown(rootDir) {
  const out = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(fullPath);
    }
  }
  return out.sort();
}

export function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
