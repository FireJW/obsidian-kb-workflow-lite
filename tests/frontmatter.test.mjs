import assert from "node:assert/strict";
import test from "node:test";

import { parseFrontmatter } from "../src/frontmatter.mjs";

test("parseFrontmatter extracts simple scalar and array values", () => {
  const parsed = parseFrontmatter(`---
title: Test Note
tags: [search, preview]
reviewed: true
priority: 2
---

Body text`);

  assert.deepEqual(parsed.data, {
    title: "Test Note",
    tags: ["search", "preview"],
    reviewed: true,
    priority: 2,
  });
  assert.equal(parsed.body.trim(), "Body text");
});

test("parseFrontmatter leaves plain markdown untouched", () => {
  const parsed = parseFrontmatter("No frontmatter");

  assert.deepEqual(parsed.data, {});
  assert.equal(parsed.body, "No frontmatter");
});
