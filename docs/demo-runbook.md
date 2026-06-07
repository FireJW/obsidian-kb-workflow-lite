# Demo Runbook

Use this runbook for a public demo.

## Commands

```bash
npm test
npm run demo
npm run demo -- preview safety
```

## Expected Behavior

- Tests run with Node's built-in test runner.
- The demo reads only `fixtures/notes/`.
- The demo prints JSON containing search results and a `kb-preview/v1` manifest.
- No live vault, cloud drive, browser, external API, or credential store is accessed.

## Review Checklist

- No real paths appear in output.
- No private notes are committed.
- No provider credentials or browser state are present.
- The README and Pages site describe the repo as preview-only.
