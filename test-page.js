const fs = require("node:fs");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");
const repos = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));

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
assert.match(
  html,
  /@Jamie-qian/,
  "page mentions the original account used before migration"
);
assert.match(
  html,
  /部分代码仓库由原账号迁移/,
  "page explains that some repositories were migrated from another account"
);
assert.match(
  html,
  /sort=pushed/,
  "repository list request is sorted by last code push"
);
assert.match(
  html,
  /repoCacheKey/,
  "page defines a local cache key for repository data"
);
assert.match(
  html,
  /readCachedRepos/,
  "page can fall back to cached repository data"
);
assert.match(
  html,
  /staticReposUrl/,
  "page defines a same-origin static repository data URL"
);
assert.match(
  html,
  /data\/repos\.json/,
  "page can read prebuilt repository data from GitHub Pages"
);
assert.match(
  html,
  /loadStaticRepos/,
  "page can fall back to prebuilt repository data when GitHub API fails"
);
assert.match(
  html,
  /GitHub API 可能限流或暂时不可访问/,
  "page explains API failure instead of showing a generic error"
);
assert.doesNotMatch(
  html,
  /repo\.updated_at/,
  "project cards should not use repository metadata updated_at"
);
assert.ok(Array.isArray(repos), "static repository data is an array");
assert.ok(repos.length > 0, "static repository data includes repositories");
assert.ok(
  repos.every((repo) => repo.name && repo.html_url && repo.pushed_at),
  "static repository data includes fields needed by project cards"
);

console.log("Page checks passed");
