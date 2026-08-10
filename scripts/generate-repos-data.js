const fs = require("node:fs/promises");
const path = require("node:path");

const userName = "Jamie0807";
const apiHeaders = { Accept: "application/vnd.github+json" };

function getReadmeSummary(markdown) {
  const lines = markdown
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) =>
      line
        .replace(/^#{1,6}\s+/, "")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`>#-]/g, "")
        .trim()
    )
    .filter(Boolean);
  const firstTextLine = lines.find((line) => line.length > 20) || lines[0];

  if (!firstTextLine) {
    return "";
  }

  return firstTextLine.length > 150 ? `${firstTextLine.slice(0, 147)}...` : firstTextLine;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: apiHeaders });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
}

async function fetchReadmeSummary(repo) {
  try {
    const readme = await fetchJson(`https://api.github.com/repos/${userName}/${repo.name}/readme`);
    const markdown = Buffer.from(readme.content || "", "base64").toString("utf8");
    return getReadmeSummary(markdown);
  } catch {
    return "";
  }
}

async function main() {
  const repos = await fetchJson(
    `https://api.github.com/users/${userName}/repos?sort=pushed&per_page=100`
  );
  const summaries = await Promise.all(
    repos.map(async (repo) => [repo.id, await fetchReadmeSummary(repo)])
  );
  const summaryByRepoId = new Map(summaries);
  const data = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    fork: repo.fork,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    pushed_at: repo.pushed_at,
    owner: {
      avatar_url: repo.owner.avatar_url,
    },
    readmeSummary: summaryByRepoId.get(repo.id) || "",
  }));
  const outputPath = path.join(process.cwd(), "data", "repos.json");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${data.length} repositories to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
