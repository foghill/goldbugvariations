# Changelog — The Gold Bug Variations site

## v5 — 2026-05-15 — Director feedback: three movements

Three-movement structure following the director's review:
`I. sky/clouds → II. cork bulletin board → III. sky/clouds (return)`.
The middle section provides deliberate visual "variation" (the
director's word) from the hero and the closing.

### Movement I — Sky / clouds (hero + theme cards)
- **Title gold** — pivot from `--ink` warm-black to deep antique
  embossed-foil `--title-gold` (`#a07c1e`) with subtle dark-gold
  inset shadow. Reads as old-book-cover foil on the dusty teal sky.
- **New subtitle / credit copy** —
  *"A Feature Film Based on the Acclaimed Novel by Richard Powers"* and
  *"Directed by the Award-Winning Director Mark A. Levinson"*.
- **Cloud-float entrance** — subtitle and credit each ride in on
  their own painterly cloud puff (cream radial gradient behind the
  text); drift in from offscreen, settle, hold. Movement III's
  clouds drift more actively — here, settle is the invitation.
- **Polaroid C redesign** — "AND · TWO" becomes the *spiral with
  four hearts* emblem the director sketched out. Two intertwined
  strands; one red heart + three ink hearts at decreasing opacity at
  the crossings. Unifies four-notes / four-bases / two-stories in a
  single mark.
- **"§ 02 · the threefold theme" eyebrow + sub removed** — was
  design-doc shorthand, never meant for the live site.
- **Sequential card arrival** — polaroids fade in one-by-one with a
  ~260ms stagger when the triptych enters the viewport.
- **Bach blurb dropped** from both the transition desk and the
  music-morph caption; the helix carries the metaphor on its own.
  Easter-egg ‡ anchor moves to the thematic logline card eyebrow.

### Movement II — Cork bulletin board (case file)
- **Walnut → cork surface** — warm-tan ground (radial gradient +
  multiplied SVG noise grain). The visual "variation" the director
  asked for.
- **Brass dome push-pins** replace the red-string + magnifying-glass
  detective cues; each `.artifact::before` is a tiny lit-metal dome.
  Red-thumbtack variant (`.pin-red`) for the encrypted-message card
  and the Pulitzer note.
- **Desk header simplified** — verbose "§ 04 · Brooklyn Public
  Library · 1985 · Three readers…" replaced with one line:
  *"Jan O'Deigh's Case File."*
- **Card roster** — kept: notebook, library catalog (already for the
  novel), Leibniz quote. New: mainframe punch card (IBM 5081 with
  illustrated 12-row × 80-column hole pattern); newspaper clipping
  (the 1958 Urbana Chronicle headline as it appears in the novel);
  Pulitzer card (Powers · The Overstory · 2019); Poe "Gold-Bug"
  source card; encrypted-message card (Poe-cipher front, decoded
  screenplay line on flip). Repurposed: film canister → torn Aria
  score slip with the opening bars hand-drawn and a small play disc
  (existing `#playInd` binding preserved). Removed: polaroid
  microscope, cast list, Tools (director credit), Current Leads
  (development partners) — the director + milestones content moves
  to Movement III.

### Movement III — Sky / clouds (return)
- **New `.closing` section** between investigation and signup.
- **Reverse-transition strip** — four pairs of painterly cloud
  ellipses (same `feTurbulence + feDisplacementMap + feGaussianBlur`
  chain as the hero) drifting upward; reads as the helix notes
  dispersing back into clouds.
- **Three cloud-borne content blocks** — director (Levinson ·
  *Particle Fever* · the films-and-formulas pull quote); synopsis
  (the case-file framing + Kirkus tag); milestones (Sundance / Film
  Independent / Sloan / Gotham). Each rides in from offscreen on its
  own cloud puff and settles, ~320ms staggered. Bookends the hero's
  cloud-text mechanic.

### Engineering
- Body class `is-closing` added to the section observer so the
  bridge audio pill steps out for Movement III.
- New JS observers: `setupPolaroidArrival()` (Movement I sequential
  reveal) and `setupClosingClouds()` (Movement III cloud drift-in).

## v4 — 2026-05-14 — Postcard Noon: painterly clouds + black stencil

A full palette + typography pivot away from v3's blue/gold cover-design
toward the dusty-teal sky and warm-cream painterly-cloud system
specified in the Postcard-Noon brief (sampled off the novel cover).

- **Palette** — v3's `--blue-*` tokens are gone. New tokens:
  `--sky-top` `#a3c2cb`, `--sky-bottom` `#7a9faa`, `--cloud-body`
  `#f0e8d6`, `--cloud-shadow` `#b3c3c9`, `--ink` `#1f1a16`,
  `--grain-tint` cream. Gold is retained only inside the detective-board
  artifact card surfaces (vintage paper) — nowhere in the global
  typography system.
- **Typography** — Stardos Stencil (700) for display titles; Allerta
  Stencil (400) at 0.42em tracking for credit lines and eyebrows; EB
  Garamond italic for subtitles. The body serif moves from Lora →
  EB Garamond.
- **Hero (§1)** — rebuilt as the Postcard-Noon component:
    1. Sky linear-gradient (sky-top → sky-bottom)
    2. Inline full-bleed SVG with **four painterly clouds**: each cloud
       is two ellipses (cool underbelly + warm-cream highlight) passed
       through a per-cloud `feTurbulence → feDisplacementMap →
       feGaussianBlur` filter chain. Unique seed per cloud; clouds at
       viewBox `1440×900` per the spec, with `preserveAspectRatio="xMidYMid slice"`.
    3. Cream-tinted film grain overlay (low opacity, `mix-blend-mode:
       overlay`).
    4. Vignette (radial gradient, corner darken).
    5. Type stack: title in Stardos Stencil uppercase, EB Garamond
       italic tagline, Allerta Stencil credit.
  No drifting cloud animation on the landing (per spec).
- **Pre-bridge cards** — circle + square retained but recolored to cream
  paper with ink rims and Stardos Stencil numerals. The music bar
  between them switches from gold to ink.
- **Bridge** — gradient retuned to sky-bottom → walnut. The morph tint
  now ramps from `--ink` (visible against teal) to `--cloud-body`
  (visible against walnut).
- **After-transition cards** — cream paper, ink hairline rim, Stardos
  Stencil numerals, EB Garamond italic headlines. The two cards
  (intertwined love stories + the mystery logline) read as matched
  paper inserts on the walnut horizon.
- **Letterbox removed** — the body-class `aria-playing` toggle and the
  top/bottom movie bars are gone. The brief explicitly asks for the
  vintage-book-cover feel over the techy film-strip framing, and the
  record-player click no longer drops black bars on top of the page.
- **Cipher key + audio button + skip-link** — re-tinted to cream + ink
  for the new system. WCAG `--gold` override scoped only to the
  detective-board artifact card surfaces where gold still lives.

## v3 — 2026-05-14 — Blue / gold overhaul

The v2-era paper/walnut version is the previous stable. To roll back,
`git revert` the v3 commit (or check out the prior tip of `main`).

A palette and structural pass driven by the director's brief: a cover-blue
ground with gold type, brochure-cloud texture, and a layered scroll flow
that splits the thematic cards around the music→DNA transition.

- **Palette / texture** — body switched from paper to a deep cover-blue
  (`--blue-deep` / `--blue` / `--blue-2`), with gold as the dominant
  foreground. The global parallax noise was replaced with a soft cloud
  layer (low-frequency fractal noise + a few drifting cumulus radials)
  drifting at 0.3× scroll. Theme-color, favicon, and selection colors
  retuned to match.
- **Hero** — blue ground with cloud overlay; title in italic gold-bright;
  the right-hand `SHOOTING · Q3 2026` topbar marker replaced with a
  director credit. OG description loses the "Shooting Q3 2026" tail.
- **§1b Simple pair (new)** — between the hero and the bridge: a
  gold-rimmed circle ("Four bass notes of music") on the upper left and
  a gold-rimmed square ("Four base molecules of DNA") on the lower
  right, with a single bar of music tilted between them. Asymmetric
  positioning + slight rotations — Miró feel.
- **Bridge** — gradient retuned to start in `--blue-deep` and roll
  through blue → walnut. The morph tint now ramps from gold-bright at
  t=0 (visible against blue) to bone at t=1 (visible against walnut).
- **§3 After-transition cards** — the old "Complexity, from a few simple
  things" thematic grid and the standalone mystery hook are merged into
  two scroll-staged cards on the walnut horizon:
    1. *Two intertwined love stories.*
    2. *Connected by the mystery of the disappearance of a brilliant
       scientist on the brink of discovering the code for life.*
  The magnifying-glass cipher reveal now lives on the second card.
- **Detective desk (§4)** — desk header simplified (the "A quiet
  detective story without a crime" line is gone). Three new artifact
  cards on the board:
    - **Leibniz quote** — paper note, tilted, in the upper-middle of
      the desk. Same artifact mechanics (flip / decrypt on back).
    - **Tools** — director credit (Mark A. Levinson · *Particle Fever*
      · the films-and-formulas pull quote). Sits bottom-left of the
      desk.
    - **Current Leads** — Sundance, Film Independent, Sloan ×3, Gotham.
      Sits bottom-right. Back side carries the production-territory
      note and the Kirkus pull quote.
  Six small Miró-inspired decorative shapes (gold dot, red dot, blue
  triangle, gold line, crescent moon) are scattered behind the
  artifacts for whimsy.
- **§6 Tools section removed** — `.tools` (director + partners +
  shooting + Kirkus grid) and its CSS are gone; content folded into
  the desk artifact cards above. The "Kit on the desk" heading and the
  standalone shooting-Q3-2026 production card are removed.
- **Easter-egg anchor** — the Leibniz-quote glyph anchor moves from the
  removed `.tools-epigraph` to the new `.leibniz blockquote` card.
- **Cipher key panel & audio button** — restyled to read on the new
  blue ground (translucent blue ground, gold-bright rim).
- **Accessibility** — WCAG --gold override now scoped only to the paper
  artifact cards (notebook / polaroid / catalog / cast / envelope /
  leibniz / tools / leads + the logline card). Skip-link recolored to
  blue/gold.

## 2026-05-09 — Director's restructure

A warmer, more emotional pass on the whole page, ordered to lead with the
love story rather than the puzzle.

- **Hero** stripped to title plus a Lora-italic tagline; "TRANSMISSION
  ENCRYPTED" topbar removed.
- **Bridge** now morphs a Bach music staff with note-heads into a DNA
  double helix; the strand-riding Gold Bug is paused for now while the
  morph beds in.
- **Thematic cards** ("Four notes / Four bases / Two love stories") added
  between the bridge and the mystery hook, framing the film around three
  simple things.
- **Mystery hook** — single line setting up the case ("the disappearance
  of a brilliant scientist poised to discover the ultimate code for life")
  introduced between the thematic cards and the detective board.
- **Detective board** (formerly Investigation) pared from eight cards to
  five — notebook, polaroid, catalog, canister, cast. Cast card is now
  role-only.
- **Tools** section added — director bio, development partners, production
  note, and the Kirkus pull quote, with the Leibniz epigraph living
  inside the section header.
- **Removed** the standalone Leibniz epigraph (relocated into Tools), the
  Poe / Bach / Powers source primer, and the testimonials carousel.
- **Signup** reframed as "Join the search" — warmer copy, an occasional
  *clue* rather than an occasional *cipher*.
- **Static Gold Bug glyphs** added under the hero scroll cue and beneath
  the hook line so the bug is the navigator across the page's transitions.
- **Footer** consolidated to a single `goldbugmovie@gmail.com` mailbox.
- **Cleanup** — orphaned telegram / punchcard / press-clipping CSS and JS
  removed, residual cipher / "encrypted" framing softened, section
  comment numbering reconciled with the final 8-section flow.

## v1 — 2026-05-06 (frozen snapshot)

Saved as [`goldbug-variations-v1.html`](./goldbug-variations-v1.html). Full
combined site, three acts:

- **Hero (paper)** — Poe-cipher cursor + symbol trail, encrypted logline that
  decrypts on entry, floating cipher-key panel.
- **Bridge (paper → walnut)** — sticky scroll-driven SVG that morphs a music
  staff with note-heads into a DNA double helix with rungs. YouTube IFrame
  audio for the Aria with archive.org fallback.
- **Investigation (walnut)** — nine draggable, flippable artifact cards on a
  dark desk, with a gold beetle that crawls naturally and reacts to the
  cursor. Card backs decrypt on flip and stay in mono / 700 / tracked
  typography in the surrounding body color.
- Two epigraph quote blocks (Leibniz before bridge, Mencken before footer).
- Featured "Join the correspondence" envelope CTA at the bottom of the desk.

Anything new should land in `goldbug-variations.html`. The v1 file is
read-only-by-convention from this point on.

## v2 — 2026-05-06

Layered on top of v1 in `goldbug-variations.html`. Major additions:

### SEO / sharing
- **Open Graph + Twitter card** meta tags so the site previews properly when
  shared (title, description, type=video.movie, director, release).
- **Schema.org Movie JSON-LD** for rich Google results — director, cast,
  production companies, source novel, genres.
- `theme-color`, `viewport-fit=cover` for iOS.

### Atmosphere
- **Hero entrance** — three title rows stagger in (120ms / 360ms / 600ms),
  followed by eyebrow / logline / credits fading at 850ms and the scroll
  cue at 1.3s. Reduced-motion safe.
- **Helix breathing** — once the staff → DNA helix completes (t > 0.7),
  the strands continuously phase-drift and amplitude-modulate ±5% so the
  helix appears to gently rotate / breathe. IO-gated rAF (pauses off-screen
  / when tab hidden).
- **Sound design** — Web Audio synthesis (no asset cost): paper rustle on
  card flip, decode chime ~1.9s after flip when the cipher cascade resolves,
  faint scuttle when the beetle bolts from the cursor. Lazy AudioContext
  unlocked on first click; silent under prefers-reduced-motion.

### Cipher engagement
- **Hover-to-decode footer** — the buried "treasure was never what we were
  looking for" message decodes within a 110px radius of the cursor, with a
  magnifying-glass cursor over the message itself.
- **Decoder toy** — when the cipher key panel is opened, an inline input
  lets you type a message and watch it encode live in Poe glyphs.
- **Easter-egg ‡ glyph hunt** — five hidden gold daggers scattered across
  credits, both epigraphs, the bridge audio button, and the desk-head
  marque. Click all five → a centered modal reveals a screenplay-only line.
  Progress badge top-right ("Glyphs · N/5"); persists in localStorage.
- **Magnified desk cipher** — the walnut desk is sprinkled with ~70 ghost
  cipher symbols (z-index below the cards). They're invisible until the
  magnifying-glass cursor passes within 170px, then fade to ~55% opacity.

### New content sections
- **Source-material primer** (`#source`) — three paper-on-walnut tear-sheets
  explaining Poe's "The Gold-Bug" (1843), Bach's Goldberg Variations (1741),
  and Powers's novel (1991), each with a representative quote.
- **Testimonials carousel** — auto-rotating notices for the novel
  (Time, NYT, Kirkus, Magill). Pauses on hover/focus, clickable dots,
  reduced-motion-aware (no auto-rotate).
- **Production journal** (`#journal`) — vertical timeline scaffold with four
  dated entries (Jan–April 2026). Easy to add new entries by copying any
  `<article class="journal-entry">` block.

### Accessibility
- **Skip link** at top: "Skip to film" → `#bridge`.
- **Keyboard nav** — all artifact cards are now `tabindex=0` with role=button
  and respond to Enter/Space to flip. Visible gold focus rings.
- **Mobile safe-area** — fixed audio button + cipher key panel honor
  `env(safe-area-inset-*)` so they don't collide with iOS home indicators.
- **WCAG AA color contrast** — scoped `--gold` override (`#7C5F18`,
  ~4.9:1 against paper) on hero / paper epigraph / primer / journal /
  card faces. Walnut sections keep the brighter gold.

### Footer / business
- **Press strip** above the link grid: Press kit PDF download, Festival
  programmers email, Financing & co-pro CTA ("Request the deck").
- Footer link columns updated to point at the actual sections (`#bridge`,
  `#source`, `#journal`) and differentiated mailto paths
  (`press@`, `fest@`, `dist@`).

### Engineering
- Single self-contained HTML, ~135 KB. Still no build step.
- New JS modules wired into `boot()`:
  `setupSoundFx`, `setupDeskCipher`, `setupTestimonials`, `setupEasterEggs`.

### Deferred
- **Wire signup form to a real ESP** — Ben wants to think about this more
  before picking a provider.
- **Self-host fonts** — Google Fonts still loaded externally.
- **Privacy analytics** — no Plausible / Fathom integration yet.
