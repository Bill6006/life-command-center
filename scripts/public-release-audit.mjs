import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const artifactArgument = process.argv.find((argument) => argument.startsWith("--artifact-dir="));
const artifactDirectory = artifactArgument
  ? resolve(artifactArgument.slice("--artifact-dir=".length))
  : null;
const forbiddenSourceHash =
  "8beb34f3389bd9945b2ec860a590820a963f90b434c32b6ad18ef7e173823865";
const forbiddenWordHashes = new Set([
  "e23b9ed01369e8d53d8a455c8d4afebdf59c082b0c863dbf24e7268767b56f32"
]);
const denylist = JSON.parse(
  readFileSync(join(root, "scripts", "privacy-denylist.sha256.json"), "utf8")
);
const findings = [];
const counts = {
  commits: 0,
  historyBlobs: 0,
  currentFiles: 0,
  buildFiles: 0,
  artifactFiles: 0
};
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
const excludedDirectories = new Set([".git", "node_modules", "local-reference"]);
const forbiddenNames = [
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)(?:legacy|original)[^/]*\.html$/i,
  /backup.*\.json$/i,
  /life-update.*\.json$/i,
  /level5.*\.json$/i,
  /work-win-proof.*\.json$/i,
  /\.private\.json$/i,
  /(?:secret|credential|private[-_]?key)/i
];
const detectors = [
  {
    label: "email address",
    pattern:
      /\b[A-Z0-9._%+-]+@(?!example\.(?:com|org|net|test)\b|users\.noreply\.github\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
  },
  {
    label: "US phone number",
    pattern: /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]\d{3}[\s.-]\d{4}\b/g
  },
  {
    label: "Social Security number",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g
  },
  {
    label: "street address",
    pattern:
      /\b\d{1,6}\s+[A-Z0-9.' -]{2,40}\s+(?:street|st|avenue|ave|road|rd|lane|ln|drive|dr|boulevard|blvd|court|ct|way)\b/gi
  },
  {
    label: "private key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g
  },
  {
    label: "GitHub token",
    pattern: /\b(?:ghp|github_pat|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b/g
  },
  {
    label: "AWS access key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/g
  },
  {
    label: "credential assignment",
    pattern:
      /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"']{8,}["']/gi
  },
  {
    label: "personal profile field",
    pattern:
      /["'](?:daughter|phone|email|resumeSummary|homeAddress)["']\s*:\s*["'][^"']+["']/gi
  },
  {
    label: "private note content",
    pattern:
      /["'](?:privateNote|journalEntry|privateContext)["']\s*:\s*["'][^"']+["']/gi
  },
  {
    label: "personal financial value",
    pattern:
      /["'](?:accountNumber|routingNumber|creditBalance|carBalance|salary|income)["']\s*:\s*(?:["']?\d[\d,.-]{2,})/gi
  }
];

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: options.encoding ?? "utf8",
    maxBuffer: 64 * 1024 * 1024
  });
}

function portable(path) {
  return path.split(sep).join("/");
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isText(path, bytes) {
  if (!textExtensions.has(extname(path).toLowerCase())) return false;
  return !bytes.subarray(0, Math.min(bytes.length, 8000)).includes(0);
}

function denylistHits(text) {
  const normalized = text.normalize("NFKC").toLowerCase();
  const grouped = new Map();
  for (const entry of denylist) {
    if (!grouped.has(entry.length)) grouped.set(entry.length, new Set());
    grouped.get(entry.length).add(entry.sha256);
  }
  for (const [length, hashes] of grouped) {
    for (let index = 0; index <= normalized.length - length; index += 1) {
      if (hashes.has(sha256(normalized.slice(index, index + length)))) {
        return true;
      }
    }
  }
  return false;
}

function scanBytes(scope, path, bytes) {
  const normalizedPath = portable(path);
  for (const pattern of forbiddenNames) {
    pattern.lastIndex = 0;
    if (pattern.test(normalizedPath)) findings.push(`${scope}:${normalizedPath}: forbidden filename`);
  }
  if (sha256(bytes) === forbiddenSourceHash) {
    findings.push(`${scope}:${normalizedPath}: protected source fingerprint`);
  }
  if (!isText(normalizedPath, bytes)) return;
  const text = bytes.toString("utf8");
  const dependencyMetadata = /(?:package-lock\.json|pnpm-lock\.yaml|yarn\.lock)$/i.test(
    normalizedPath
  );
  for (const detector of detectors) {
    if (dependencyMetadata && detector.label === "email address") continue;
    detector.pattern.lastIndex = 0;
    if (detector.pattern.test(text)) {
      findings.push(`${scope}:${normalizedPath}: ${detector.label}`);
    }
  }
  if (denylistHits(text)) {
    findings.push(`${scope}:${normalizedPath}: protected source signature`);
  }
  for (const word of text.normalize("NFKC").toLowerCase().matchAll(/\b[\p{L}\p{N}_-]+\b/gu)) {
    if (forbiddenWordHashes.has(sha256(word[0]))) {
      findings.push(`${scope}:${normalizedPath}: protected personal-name signature`);
      break;
    }
  }
}

function walk(directory, scope, relativeTo, allowExclusions) {
  if (!existsSync(directory)) return;
  for (const name of readdirSync(directory)) {
    if (allowExclusions && excludedDirectories.has(name)) continue;
    const absolute = join(directory, name);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      walk(absolute, scope, relativeTo, allowExclusions);
      continue;
    }
    const path = relative(relativeTo, absolute);
    if (scope === "artifact") counts.artifactFiles += 1;
    else if (portable(path).startsWith("dist/")) counts.buildFiles += 1;
    else counts.currentFiles += 1;
    scanBytes(scope, path, readFileSync(absolute));
  }
}

const commitLines = git([
  "log",
  "--all",
  "--format=%H%x09%an%x09%ae%x09%cn%x09%ce"
])
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
counts.commits = commitLines.length;
for (const line of commitLines) {
  const [hash, , authorEmail, , committerEmail] = line.split("\t");
  for (const [role, email] of [
    ["author", authorEmail],
    ["committer", committerEmail]
  ]) {
    if (email && !/@users\.noreply\.github\.com$/i.test(email)) {
      findings.push(`history:${hash}: non-noreply ${role} email`);
    }
  }
}

const historyObjects = git(["rev-list", "--objects", "--all"])
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
const seenBlobs = new Set();
for (const entry of historyObjects) {
  const [object, ...pathParts] = entry.split(" ");
  if (!object || git(["cat-file", "-t", object]).trim() !== "blob" || seenBlobs.has(object)) {
    continue;
  }
  seenBlobs.add(object);
  counts.historyBlobs += 1;
  const path = pathParts.join(" ") || object;
  const bytes = git(["cat-file", "blob", object], { encoding: "buffer" });
  scanBytes("history", path, bytes);
}

walk(root, "working-tree", root, true);
if (artifactDirectory) {
  walk(artifactDirectory, "artifact", artifactDirectory, false);
}

let localReferenceIgnored = false;
try {
  git(["check-ignore", "-q", "--no-index", "local-reference/audit-probe"]);
  localReferenceIgnored = true;
} catch {
  localReferenceIgnored = false;
}
if (!localReferenceIgnored) {
  findings.push("working-tree:local-reference: local-only analysis directory is not ignored");
}

const uniqueFindings = [...new Set(findings)].sort();
if (uniqueFindings.length) {
  console.error("Public release audit failed:");
  for (const finding of uniqueFindings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(
  `Public release audit passed: ${counts.commits} commits, ${counts.historyBlobs} unique ` +
    `history blobs, ${counts.currentFiles} current files, ${counts.buildFiles} build files, ` +
    `${counts.artifactFiles} artifact files; commit identities use GitHub noreply addresses.`
);
