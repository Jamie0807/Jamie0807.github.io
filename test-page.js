const fs = require("node:fs");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");
const repos = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));

assert.match(html, /id="repo-grid"/, "page exposes a repository grid");
assert.match(html, /id="fork-grid"/, "page exposes a fork repository grid");
assert.match(html, /Fork 项目/, "page has a separate fork project section");
assert.match(html, /blog-shell/, "page uses a blog-style shell");
assert.match(html, /blog-header/, "page uses a compact blog header");
assert.match(html, /repo-list/, "page uses a blog-style project list");
assert.match(html, /repo-entry/, "page renders projects as list entries");
assert.match(html, /journal-shell/, "page uses the Pencil journal shell");
assert.match(html, /site-nav/, "page includes the Pencil-style top navigation");
assert.match(html, /hero-kicker/, "page includes a compact editorial hero label");
assert.match(html, /hero-title/, "page uses an editorial hero title");
assert.match(html, /featured-grid/, "page includes featured project cards");
assert.match(html, /archive-grid/, "page includes the readme/repo archive grid");
assert.match(html, /contact-strip/, "page includes the final contact section");
assert.match(html, /Playfair Display/, "page uses the Pencil heading font");
assert.match(html, /#F5F3EE/i, "page uses the Pencil warm paper background");
assert.match(html, /#2D5E3A/i, "page uses the Pencil green accent");
assert.doesNotMatch(html, /class="avatar"/, "blog-style page does not show a profile photo");
assert.doesNotMatch(html, /id="avatar"/, "blog-style page does not depend on an avatar element");
assert.match(
  html,
  /Frontend \| Full-Stack \| Data Science &amp; (AI|Artificial Intelligence \| Agent) \| University of Liverpool/,
  "page syncs the GitHub profile bio"
);
assert.match(
  html,
  /jamiexiaoqianqian@gmail\.com/,
  "page syncs the GitHub profile email"
);
assert.match(html, /jamiexiaoqian/, "page syncs social profile links");
assert.match(html, /qianqian-xiao/, "page syncs LinkedIn profile");
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
assert.ok(
  repos.some((repo) => repo.fork),
  "static repository data includes forked repositories"
);
assert.match(
  repos.find((repo) => repo.name === "magicut")?.description || "",
  /Magicut 是一个 AI 驱动的桌面端智能视频剪辑平台/,
  "static repository data includes the current magicut GitHub description"
);
assert.ok(
  repos.every((repo) => !repo.readmeSummary || !repo.readmeSummary.endsWith("...")),
  "static README summaries should not be truncated with an ellipsis"
);
assert.doesNotMatch(
  repos.find((repo) => repo.name === "team-spec")?.readmeSummary || "",
  /并已接入$/,
  "team-spec README summary should include the full first paragraph, not a partial line"
);

console.log("Page checks passed");
