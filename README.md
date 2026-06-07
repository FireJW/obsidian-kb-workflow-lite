# Obsidian KB Workflow Lite

Public-safe preview workflow primitives for Obsidian-style Markdown knowledge bases.

This repository is a clean extraction inspired by a larger private knowledge-base automation system. It does not include live vault paths, personal notes, provider credentials, browser profiles, machine-local configuration, or write-to-vault operations. It only demonstrates the small reusable core: frontmatter parsing, wikilink extraction, lexical search, and preview manifest generation against synthetic fixture notes.

## What It Demonstrates

- YAML-like frontmatter parsing for simple Markdown notes.
- Obsidian wikilink extraction and backlink indexing.
- Lightweight lexical search with title, tag, and body scoring.
- Preview-only manifest generation for reviewable automation output.
- Zero dependency Node.js implementation with fixture-backed tests.

## Quick Start

```bash
npm test
npm run demo
npm run demo -- preview safety
```

The demo reads only `fixtures/notes/` and prints JSON to stdout.

## Example Output

```json
{
  "query": "retrieval workflow",
  "results": [
    {
      "title": "Retrieval Workflow",
      "score": 11,
      "path": "retrieval-workflow.md"
    }
  ],
  "manifest": {
    "manifest_version": "kb-preview/v1",
    "write_mode": "preview-only"
  }
}
```

## Repository Map

```text
obsidian-kb-workflow-lite/
├── src/
│   ├── frontmatter.mjs   # Small frontmatter parser
│   ├── wikilinks.mjs     # Wikilink and backlink helpers
│   ├── notes.mjs         # Fixture note loader
│   ├── search.mjs        # Lexical search scorer
│   └── preview.mjs       # Preview manifest builder
├── scripts/demo.mjs      # Local demo command
├── fixtures/notes/       # Synthetic notes only
├── tests/                # Node test runner coverage
└── docs/                 # GitHub Pages portfolio docs
```

## Safety Boundary

This package is intentionally preview-only:

- no real Obsidian vault paths;
- no cloud-drive or machine-local paths;
- no API keys, provider configs, cookies, or browser profiles;
- no private notes or personal knowledge-base content;
- no write-to-vault command;
- no deletion or cleanup command.

Use this repo as a public portfolio artifact for the workflow pattern, not as a dump of a private vault automation system.

## Documentation

- [Portfolio overview](https://firejw.github.io/obsidian-kb-workflow-lite/)
- [Security and privacy](docs/security-and-privacy.md)
- [Demo runbook](docs/demo-runbook.md)

## License

MIT License. See [LICENSE](LICENSE).
