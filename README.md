# The Gold Bug Variations — site

Single-page promotional site for the upcoming feature film **The Gold Bug
Variations**, directed by Mark A. Levinson, based on Richard Powers's
Pulitzer Prize-winning novel.

> A brilliant scientist on the brink of cracking the code for life is
> derailed by music, and by the search for the code for love.

## Stack

Single self-contained HTML file — no build step, no framework. Inline CSS
+ vanilla JS, served as a static asset by Netlify.

```
.
├── index.html         ← the entire site
├── press-kit.pdf      ← linked from the footer
├── netlify.toml       ← cache + security headers
├── CHANGELOG.md       ← versioned feature history
├── MAILING_LIST.md    ← Google Sheet signup setup
└── README.md
```

## Working on it locally

Just open `index.html` in a browser. Edits are live on save / refresh.

For Netlify-style serving (correct headers, etc.), the easiest path is:

```bash
npx serve .          # quick local server on port 3000
```

…or any static server you prefer.

## Sections of the page

1. **Hero (paper)** — title set "The Gold / Bug / Variations" with a
   warm Lora-italic tagline. Custom Poe-cipher cursor + symbol trail.
2. **Bridge (paper → walnut)** — sticky scroll-driven SVG that morphs a
   Bach music staff with note-heads into a DNA double helix. Goldberg
   Aria audio toggle (YouTube IFrame API + archive.org fallback).
3. **Thematic cards** — four notes, four bases, two love stories.
4. **Mystery hook** — a single caption setting up the case.
5. **Detective board (walnut)** — five draggable, flippable artifact
   cards on a dark desk; gold beetle that crawls naturally and flees
   from the cursor; ghost cipher symbols revealed by the magnifying-glass
   cursor.
6. **Tools** — director bio, development partners, production note, and
   a Kirkus pull quote (with the Leibniz epigraph at the section head).
7. **Signup** — "Join the search" envelope CTA.
8. **Footer** — press kit, festival programmers, financing &amp; co-pro,
   honors, link grid, and the never-decrypting cipher line.

Plus: floating Poe substitution-key panel with a built-in live encoder,
and an easter-egg ‡ glyph hunt across five hidden locations that unlocks
a screenplay quote.

## Deploys

Netlify, connected to this repo. Every push to `main` triggers a
production build. Branch deploys give preview URLs.

See [`netlify.toml`](./netlify.toml) for cache headers and the
forced-download filename for the press kit.

## Mailing list

Signup on the page POSTs to a Google Apps Script that appends rows to a
Google Sheet. URL is configured via the `<meta name="signup-endpoint">`
tag in `index.html`. Full setup walkthrough in
[`MAILING_LIST.md`](./MAILING_LIST.md).

## Adding new features

See [`CHANGELOG.md`](./CHANGELOG.md) for the feature history and how the
versioning works (snapshot files for major versions).
