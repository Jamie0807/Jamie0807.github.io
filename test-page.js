const fs = require("node:fs");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");
const aboutHtml = fs.readFileSync("about.html", "utf8");
const courageArticle = fs.readFileSync("blog/about-me-courage.html", "utf8");
const repos = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));

assert.match(html, /id="repo-grid"/, "page exposes a repository grid");
assert.match(html, /id="fork-grid"/, "page exposes a fork repository grid");
assert.match(html, /Forked Projects/, "page has a separate fork project section");
assert.match(html, /blog-shell/, "page uses a blog-style shell");
assert.match(html, /blog-header/, "page uses a compact blog header");
assert.match(html, /repo-list/, "page uses a blog-style project list");
assert.match(html, /repo-entry/, "page renders projects as list entries");
assert.match(html, /journal-shell/, "page uses the Pencil journal shell");
assert.match(html, /site-nav/, "page includes the Pencil-style top navigation");
assert.match(html, /href="about\.html"/, "page navigation links to the About Jamie page");
assert.match(html, /href="#blog"/, "page navigation links to the blog article section");
assert.match(html, /hero-kicker/, "page includes a compact editorial hero label");
assert.match(html, /hero-title/, "page uses an editorial hero title");
assert.doesNotMatch(html, /id="about"/, "home page should link to About instead of embedding it");
assert.match(aboutHtml, /About Jamie/, "About page labels the personal introduction page");
assert.match(aboutHtml, /Education/, "About page includes education experience");
assert.match(aboutHtml, /Experience/, "About page includes work or practice experience");
assert.match(aboutHtml, /Project Experience/, "About page includes project experience");
assert.match(aboutHtml, /University of Liverpool/, "About page includes education details");
assert.match(aboutHtml, /AI workflow/, "About page mentions AI workflow experience");
assert.match(aboutHtml, /Magicut/, "About page mentions representative project experience");
assert.match(aboutHtml, /href="index\.html"/, "About page links back to the home page");
assert.match(html, /id="blog"/, "page includes a blog article section");
assert.match(html, /Blog Articles/, "page labels the section as blog articles");
assert.match(html, /article-grid/, "page lays out blog articles separately from repositories");
assert.match(html, /article-card/, "page renders blog articles as article cards");
assert.match(html, /href="blog\/about-me-courage\.html"/, "first blog article links to its real article page");
assert.match(html, /About Me｜我的勇气，是算清底线后，依然敢纵身一跃/, "blog section includes the first real article");
assert.match(courageArticle, /About Me｜我的勇气，是算清底线后，依然敢纵身一跃/, "article page includes the requested title");
assert.match(courageArticle, /缘起：一场裁员，撞开了人生的新路口/, "article page includes the first requested section");
assert.match(courageArticle, /抉择：28 岁，我决定赌一把重启人生/, "article page includes the second requested section");
assert.match(courageArticle, /死磕：高考英语 50 分，我从零啃到了名校 offer/, "article page includes the third requested section");
assert.match(courageArticle, /这就是我的勇气。也是我走到今天的全部答案。/, "article page includes the requested ending");
assert.match(courageArticle, /href="..\/index\.html#blog"/, "article page links back to the blog section");
assert.doesNotMatch(html, /Featured Notes/, "old featured repository label should be removed");
assert.doesNotMatch(html, /From Repository Studies to Readable Picks/, "old featured repository heading should be removed");
assert.doesNotMatch(html, /featured-grid/, "home page no longer uses featured repository cards");
assert.match(html, /archive-grid/, "page includes the readme/repo archive grid");
assert.match(html, /contact-strip/, "page includes the final contact section");
assert.match(html, /Playfair Display/, "page uses the Pencil heading font");
assert.match(html, /#F5F3EE/i, "page uses the Pencil warm paper background");
assert.match(html, /#2D5E3A/i, "page uses the Pencil green accent");
assert.doesNotMatch(
  html,
  /部分代码仓库|页面中的维护时间|代码维护于|公开项目|Fork 项目|正在|读取失败|这个项目还没有填写简介|暂时没有可展示|GitHub 仓库列表/,
  "page UI copy should be English"
);
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
  /Code maintained/,
  "page labels project dates as code maintenance time in English"
);
assert.match(html, /DateTimeFormat\("en-US"/, "project dates use English formatting");
assert.doesNotMatch(html, /DateTimeFormat\("zh-CN"/, "project dates should not use Chinese formatting");
assert.match(html, /function containsHan/, "page can detect non-English repository copy");
assert.match(html, /function getDisplayDescription/, "page normalizes repository descriptions for the English page");
assert.match(html, /englishDescriptionByRepoName/, "page includes English description overrides for highlighted repositories");
assert.match(
  html,
  /Project notes are available in the repository README/,
  "page has an English fallback for untranslated repository descriptions"
);
assert.match(
  html,
  /@Jamie-qian/,
  "page mentions the original account used before migration"
);
assert.match(
  html,
  /Some repositories were migrated from my previous account/,
  "page explains in English that some repositories were migrated from another account"
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
  /GitHub API may be rate limited or temporarily unavailable/,
  "page explains API failure in English instead of showing a generic error"
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
