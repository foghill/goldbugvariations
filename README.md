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

## Visual framework — three movements

The site reads as three deliberate movements, like the Goldberg's
tripartite arc:

```
I. Sky / clouds  →  II. Cork bulletin board  →  III. Sky / clouds (return)
   Hero + theme cards       Jan O'Deigh's Case File          Director · synopsis · partners
```

The cork bulletin board in the middle is the deliberate visual
**variation** — a tactile, period-correct case file that breaks the
painterly-sky aesthetic that bookends it.

## Sections of the page

### Movement I — Sky / clouds

1. **Hero** — dusty-teal sky with painterly cloud SVG (`feTurbulence` →
   `feDisplacementMap` → `feGaussianBlur` filter chain, per the
   Postcard-Noon brief). Title in deep antique gold stencil. Subtitle
   and credit ride in on individual cloud puffs (drift, settle, hold)
   and bookend Movement III's drifting clouds. Custom Poe-cipher
   cursor + symbol trail throughout.
2. **Three theme cards** — a polaroid triptych pinned over the seam
   between the hero and the music morph: *MUSIC · FOUR* (four bass
   notes of music, with the Goldberg ground-bass tetrachord G F♯ E D),
   *LIFE · FOUR* (four base molecules of DNA, with a vertical helix
   and A T G C labels), and *AND · TWO* (the four-hearts-on-a-spiral
   emblem unifying notes, bases, and love stories). Cards arrive
   sequentially as the section enters the viewport (~260ms stagger).
3. **Music → DNA morph** — sticky scroll-driven SVG that bends a
   Bach music staff with note-heads into a DNA double helix. Same
   primitives at every `t` — no cross-fade between two visual systems.
4. **Connected-by card** — single line below the morph: *"Connected by
   the mystery of the disappearance of a brilliant scientist on the
   brink of discovering the code for life."* Carries the
   magnifying-glass cipher reveal.

### Movement II — Cork bulletin board

5. **Jan O'Deigh's Case File** — warm tan cork ground with fine grain
   texture. Six draggable, flippable artifact cards pinned with brass
   dome push-pins (red thumbtacks on the accented ones):
   - **Handwritten lab notebook** (S.R. · Aug 1957) — ATGC notes,
     codon arithmetic, Goldberg margin doodles
   - **Library catalog card** for the novel itself — click flips to
     a Powers bio + novel summary
   - **Leibniz quote** — *"Music is the pleasure the human mind
     experiences from counting without being aware that it is counting."*
   - **Aria score snippet** — spinning vinyl record with a paper
     label ("REEL · 01 / Aria / BWV 988 / — J.S. Bach —"). Click the
     play disc to start the Goldberg Aria (YouTube IFrame API +
     archive.org fallback); the ring spins under the label while
     playing.
   - **Newspaper clipping** — the 1958 *Urbana Chronicle* headline as
     it appears in the novel: *"Dr. Stuart Ressler: One of the New
     Breed Who Will Help Uncover the Formula for Human Life."*
   - **IBM 5081 punch card** — 80-column, 12-row mainframe punch
     card placing Ressler in the magnetic-tape graveyard shift of
     1985 Manhattan On-Line

   Gold beetle perambulates around the board and flees from the
   cursor. Cards keyboard-focusable (Enter / Space to flip).

### Movement III — Sky / clouds (return)

6. **Closing clouds** — reverse-transition strip (helix notes
   dispersing back into cloud puffs) into three cloud-borne content
   blocks: **director** (Levinson · *Particle Fever* · DaVinci Award ·
   Stephen Hawking Medal · the *films-and-formulas* pull quote),
   **synopsis** (1957 / 1985 framing of Ressler and Jan, with the
   Kirkus pull quote), and **development partners** (Sundance Lab,
   Film Independent Fast Track, Sloan ×3, Gotham No-Borders). Each
   block drifts in from offscreen on its own cloud puff and settles,
   ~320ms staggered.
7. **Signup** — "Join the search" envelope CTA on a return-to-sky
   panel above the colophon.
8. **Footer (masthead)** — typeset colophon: FOLIO I OF IV · SITE NO.
   0001 · title · *a feature film by Mark A. Levinson · after Richard
   Powers* · press kit / festival programmers / financing · sitemap ·
   the never-decrypting Poe-cipher line.

Plus: floating Poe substitution-key panel with a built-in live
encoder, and an easter-egg ‡ glyph hunt across five hidden locations
that unlocks a screenplay quote.

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

See [`CHANGELOG.md`](./CHANGELOG.md) for the feature history. v3 (blue
+ gold cover), v4 (Postcard-Noon teal + black stencil), and v5
(director feedback · three movements · cork board) are the recent
milestones; point releases (v5.1 → v5.6) trail each.
