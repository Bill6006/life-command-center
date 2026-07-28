import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const denylistPath = join(root, "scripts", "privacy-denylist.sha256.json");
const denylist = JSON.parse(readFileSync(denylistPath, "utf8"));
const textExtensions = new Set([
  "",
  ".css",
  ".csv",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml"
]);
const forbiddenNames = [
  /(^|\/)legacy-source(\/|$)/i,
  /(^|\/)local-reference(\/|$)/i,
  /(^|\/)index\.html$/i,
  /backup.*\.json$/i,
  /life-update.*\.json$/i,
  /level5.*\.json$/i,
  /work-win-proof.*\.json$/i,
  /\.private\.json$/i
];
const genericDetectors = [
  {
    label: "email address",
    pattern: /\b[A-Z0-9._%+-]+@(?!example\.(?:com|org|net|test)\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
  },
  {
    label: "US phone number",
    pattern: /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]\d{3}[\s.-]\d{4}\b/g
  },
  {
    label: "private key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g
  },
  {
    label: "credential assignment",
    pattern: /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"']{8,}["']/gi
  },
  {
    label: "embedded personal profile seed",
    pattern: /["'](?:daughter|phone|email|resumeSummary)["']\s*:\s*["'][^"']+["']/gi
  }
];

function normalized(value) {
  return value.normalize("NFKC").toLowerCase();
}

function sha256(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function trackedFiles() {
  try {
    return execFileSync("git", ["ls-files", "-z"], {
      cwd: root,
      encoding: "utf8"
    })
      .split("\0")
      .filter(Boolean);
  } catch {
    return [];
  }
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const name of readdirSync(directory)) {
    const absolute = join(directory, name);
    const stat = statSync(absolute);
    if (stat.isDirectory()) files.push(...walk(absolute));
    else files.push(relative(root, absolute).split(sep).join("/"));
  }
  return files;
}

function hashedSignatureHits(text) {
  const value = normalized(text);
  const hits = [];
  const byLength = new Map();
  for (const entry of denylist) {
    if (!byLength.has(entry.length)) byLength.set(entry.length, new Set());
    byLength.get(entry.length).add(entry.sha256);
  }
  for (const [length, hashes] of byLength) {
    for (let index = 0; index <= value.length - length; index += 1) {
      if (hashes.has(sha256(value.slice(index, index + length)))) {
        hits.push(`protected hashed signature (length ${length})`);
        break;
      }
    }
  }
  return hits;
}

const files = [...new Set([...trackedFiles(), ...walk(join(root, "dist"))])].sort();
const findings = [];

for (const file of files) {
  const portable = file.replaceAll("\\", "/");
  for (const pattern of forbiddenNames) {
    if (pattern.test(portable)) findings.push(`${portable}: forbidden filename`);
  }

  const absolute = join(root, file);
  if (!existsSync(absolute) || !textExtensions.has(extname(file).toLowerCase())) {
    continue;
  }

  const text = readFileSync(absolute, "utf8");
  for (const detector of genericDetectors) {
    detector.pattern.lastIndex = 0;
    if (detector.pattern.test(text)) findings.push(`${portable}: ${detector.label}`);
  }
  for (const hit of hashedSignatureHits(text)) {
    findings.push(`${portable}: ${hit}`);
  }
}

if (findings.length > 0) {
  console.error("Privacy scan failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Privacy scan passed: ${files.length} repository/build files checked.`);
