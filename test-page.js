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

console.log("Page checks passed");
