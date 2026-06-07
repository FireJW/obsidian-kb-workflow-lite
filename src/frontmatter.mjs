export function parseFrontmatter(markdown) {
  const text = String(markdown ?? "");
  if (!text.startsWith("---\n")) {
    return { data: {}, body: text };
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, body: text };
  }
  const block = text.slice(4, end).trim();
  const bodyStart = text.indexOf("\n", end + 4);
  const body = bodyStart === -1 ? "" : text.slice(bodyStart + 1);
  return { data: parseYamlSubset(block), body };
}

export function parseYamlSubset(block) {
  const data = {};
  for (const rawLine of String(block ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf(":");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    data[key] = parseScalar(value);
  }
  return data;
}

function parseScalar(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => stripQuotes(item.trim()));
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return stripQuotes(value);
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}
