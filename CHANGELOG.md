# Changelog — The Gold Bug Variations site

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
