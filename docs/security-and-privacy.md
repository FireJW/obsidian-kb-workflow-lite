# Security and Privacy

This repo is a public-safe extraction. It must stay independent from any real vault, personal notes, local machine paths, API credentials, or provider configs.

## Included

- Synthetic Markdown fixture notes.
- Frontmatter parsing.
- Wikilink extraction and backlink indexing.
- Lexical search over fixtures.
- Preview-only manifest generation.

## Excluded

- Real Obsidian vault paths.
- Personal notes or client notes.
- API keys, cookies, sessions, provider configs, browser profiles, or account data.
- Commands that write to, delete from, or clean a live vault.
- Machine-specific paths or automation state.

## Public Demo Rules

- Use only `fixtures/notes/`.
- Print demo output to stdout or a temporary local file.
- Do not add real note exports, screenshots of private vaults, or local path examples.
- Keep all generated artifacts preview-only unless a separate private workflow handles live writes.
