# Courage Essay English Translation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the first personal blog essay and its homepage card into polished English while preserving the existing layout, facts, chronology, and links.

**Architecture:** Keep the current static GitHub Pages structure. The article remains at `blog/about-me-courage.html`, and the homepage card in `index.html` continues to link to it. Extend the existing Node assertion script so the English copy and removal of the old Chinese copy are verified without adding dependencies.

**Tech Stack:** Static HTML, embedded CSS, Node.js built-in `fs` and `assert`, GitHub Pages.

## Global Constraints

- Keep the article URL `blog/about-me-courage.html` unchanged.
- Keep the existing layout, navigation, date `Personal Essay · August 31, 2026`, styling, and back-to-blog link unchanged.
- Preserve all stated dates, ages, locations, IELTS scores, University of Liverpool offer details, and the 531-day reflection.
- Use faithful, polished personal-essay English rather than literal sentence-by-sentence translation.
- Do not add new biographical facts or expose information outside the supplied essay.

## File Map

- Modify `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/test-page.js`: replace Chinese article assertions with English-copy and no-old-copy assertions.
- Modify `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/index.html`: translate the first article card title, accessibility label, and excerpt.
- Modify `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/blog/about-me-courage.html`: translate metadata and the complete essay body while leaving markup and navigation intact.

### Task 1: Add failing English-copy assertions

**Files:**
- Modify: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/test-page.js`

- [x] **Step 1: Replace the homepage card assertion**

Replace the Chinese card assertion with:

```js
assert.match(
  html,
  /My Courage: Taking the Leap After Counting the Cost/,
  "blog section includes the translated first article"
);
```

- [x] **Step 2: Replace the article assertions**

Add assertions for the translated title, four translated section headings, the University of Liverpool offer sentence, and the translated ending. Also add:

```js
assert.doesNotMatch(
  courageArticle,
  /我的勇气|缘起：一场裁员|抉择：28 岁|死磕：高考英语|写在最后/,
  "article page no longer contains the previous Chinese essay copy"
);
```

The exact positive assertions should be:

```js
assert.match(courageArticle, /<h1>My Courage: Taking the Leap After Counting the Cost<\/h1>/);
assert.match(courageArticle, /<h2>Origin: A Layoff Opened a New Chapter of Reflection<\/h2>/);
assert.match(courageArticle, /<h2>The Choice: At 28, I Decided to Bet on Starting Over<\/h2>/);
assert.match(courageArticle, /<h2>Relentless Effort: From a 50 on the Gaokao English Exam to IELTS from Scratch<\/h2>/);
assert.match(courageArticle, /<h2>Written at the End<\/h2>/);
assert.match(courageArticle, /I finally received an offer for the University of Liverpool's 20-week Pre-sessional English course/);
assert.match(courageArticle, /This is my courage\. It is also the whole answer to how I got here\./);
```

- [x] **Step 3: Run the test and verify it fails for the expected reason**

Run `node test-page.js`. Expected: FAIL because the current homepage card and article still contain the Chinese title and body.

### Task 2: Translate the article and homepage card

**Files:**
- Modify: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/index.html`
- Modify: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/blog/about-me-courage.html`

- [x] **Step 1: Update the homepage card**

Set the card accessibility label and heading to `Read My Courage: Taking the Leap After Counting the Cost` and `My Courage: Taking the Leap After Counting the Cost`. Keep the existing `About Me` label and English excerpt.

- [x] **Step 2: Update article metadata and headings**

Set the article meta description, document title, and `h1` to `My Courage: Taking the Leap After Counting the Cost`. Keep the `About Me` eyebrow and `Personal Essay · August 31, 2026` metadata. Use these headings:

```html
<h2>Origin: A Layoff Opened a New Chapter of Reflection</h2>
<h2>The Choice: At 28, I Decided to Bet on Starting Over</h2>
<h2>Relentless Effort: From a 50 on the Gaokao English Exam to IELTS from Scratch</h2>
<h2>Written at the End</h2>
```

- [x] **Step 3: Translate every paragraph without changing the markup structure**

Use the supplied essay as the source of truth. Preserve the 2022 layoff, five years as a frontend developer in Beijing, June 17, 2022 resignation, travel through Shenzhen, Guangzhou, Kunming, Dali, Lijiang, and Shangri-La, private non-computer-science undergraduate background, 50-plus Gaokao English score, IELTS attempts and scores, August move to Tianjin, November and December computer-based tests, January 25, 2024 University of Liverpool offer, 531 days abroad, dedication, and final reflection.

- [x] **Step 4: Run the page test and verify it passes**

Run `node test-page.js`. Expected: PASS with no assertion failures.

### Task 3: Review, commit, and publish

**Files:**
- Review: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/test-page.js`
- Review: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/index.html`
- Review: `/Users/jamie/Documents/文稿 - Jamie的MacBook Pro/code/Jamie0807.github.io/blog/about-me-courage.html`

- [x] **Step 1: Check whitespace and inspect the diff**

Run `git diff --check`, `git diff --stat`, and `git diff -- test-page.js index.html blog/about-me-courage.html`. Expected: no whitespace errors and only the English essay, homepage card, and related assertions are changed.

- [x] **Step 2: Commit the implementation**

Run `git add test-page.js index.html blog/about-me-courage.html && git commit -m "Translate courage essay into English"`.

- [x] **Step 3: Push to GitHub Pages**

Run `git push origin main`. Expected: the `main` branch is updated on the existing GitHub Pages repository.

- [x] **Step 4: Verify the published commit**

Run `git status --short`, `git log -1 --oneline`, and `git ls-remote origin main`. Expected: the worktree is clean and local `HEAD` matches `origin/main`.
