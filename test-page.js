const fs = require("node:fs");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");

assert.match(html, /id="repo-grid"/, "page exposes a repository grid");
assert.match(
  html,
  /https:\/\/api\.github\.com\/users\/Jamie0807\/repos/,
  "page fetches Jamie0807 public repositories"
);
assert.match(html, /function renderRepos/, "page has repository rendering logic");
assert.match(html, /function renderError/, "page has an error state");
assert.match(
  html,
  /function getReadmeSummary/,
  "page can extract a readable summary from README text"
);
assert.match(
  html,
  /\/repos\/\$\{userName\}\/\$\{repo\.name\}\/readme/,
  "page fetches a repository README when needed"
);
assert.match(
  html,
  /repo\.description \|\| repo\.readmeSummary/,
  "page prefers GitHub description before README summary"
);

console.log("Page checks passed");
