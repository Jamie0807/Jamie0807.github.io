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
assert.match(
  html,
  /pushed_at/,
  "page uses the last code push timestamp for project dates"
);
assert.match(
  html,
  /代码维护于/,
  "page labels project dates as code maintenance time"
);
assert.doesNotMatch(
  html,
  /repo\.updated_at/,
  "project cards should not use repository metadata updated_at"
);

console.log("Page checks passed");
