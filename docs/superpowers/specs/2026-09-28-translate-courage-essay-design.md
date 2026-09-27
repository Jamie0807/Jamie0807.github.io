# Courage Essay English Translation Design

## Goal

Convert the first personal essay on the GitHub Pages blog from Chinese to natural English while preserving the author's facts, chronology, voice, and existing blog layout.

## Scope

- Translate the article page at `blog/about-me-courage.html`.
- Replace the article document title, meta description, page heading, section headings, body paragraphs, and closing text with English copy.
- Update the matching article card in `index.html` so its title, description, and accessibility label are also English.
- Keep the existing navigation labels, article URL, date, styling, and back-to-blog link unchanged.
- Keep the article eyebrow as `About Me` and the metadata as `Personal Essay · August 31, 2026`.

## Content Direction

Use faithful, polished personal-essay English rather than literal sentence-by-sentence translation. Preserve all stated dates, ages, locations, education details, IELTS scores, University of Liverpool offer details, and the 531-day reflection. Do not add new biographical facts or expose information outside the supplied essay.

Proposed title:

> My Courage: Taking the Leap After Counting the Cost

Proposed section structure:

1. Origin: A Layoff Opened a New Chapter of Reflection
2. The Choice: At 28, I Decided to Bet on Starting Over
3. Relentless Effort: From a 50 on the Gaokao English Exam to IELTS from Scratch
4. Written at the End

## Verification

- Add or update `test-page.js` assertions for the English title, article card copy, section headings, representative translated paragraphs, and the closing passage.
- Confirm old Chinese article copy and the previous Chinese title are absent from both the article page and the homepage card.
- Run `node test-page.js`.
- Run `git diff --check`.
- Inspect the final diff before committing and push the implementation to the existing GitHub Pages remote.
