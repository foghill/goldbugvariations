# Site Restructure: Director's Synthesis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the single-file site `index.html` from its current 8-section flow into the director's 7-section flow — warmer hero, bug-led spiral transition, three thematic cards, mystery hook, pared 5-card detective board, "Tools" section, and a "Join the Search" CTA — while applying a simple→complex→simple arc and a warmer/more emotional tone throughout.

**Architecture:** Everything lives in `index.html` (HTML, embedded CSS in `<style>`, embedded JS in a single IIFE). Existing primitives are reused wherever possible: the bridge SVG morph becomes a simpler bug-led spiral; the existing `<div class="beetle">` and its scuttling-trail logic gain a "ride the strand" mode; the source-primer 3-column grid is repurposed into the new thematic cards; the existing 8 investigation artifacts are pruned to 5 and the two extracted cards (telegram = director bio, punchcard = dev partners) move into a new Tools section.

**Tech Stack:** Plain HTML5 + CSS (custom properties, scroll-driven animations) + vanilla JS. No build step. Hosted on Netlify (`netlify.toml`). Fonts: Archivo (display), Lora (serif), JetBrains Mono, Caveat (hand). Tone target leans on Lora italic and Caveat for warmth.

**Verification approach:** This is visual/UX work in a static HTML file with no test harness. Each task ends with a browser-preview check (open `index.html`, visually confirm the section, scroll through, and verify no console errors). Use `python3 -m http.server 8080` from the repo root to serve, then open `http://localhost:8080/`.

---

## Section Mapping (current → target)

| # | Current section | Lines | Target | Action |
|---|---|---|---|---|
| 1 | Hero | 1988–2038 | **§1 Landing** | Strip back, warm font |
| 2 | Epigraph (Leibniz) | 2045–2050 | — | Remove (or relocate inside Tools) |
| 3 | Bridge (staff→helix) | 2056–2092 | **§2 Bug-led spiral transition** | Simplify; bug rides single gold strand |
| — | (new) | — | **§3 Three thematic cards** | New: 4 bass / 4 bases / 2 love stories |
| — | (new) | — | **§4 Mystery hook line** | New: short caption section |
| 4 | Investigation (8 cards) | 2098–2332 | **§5 Detective board (5 cards)** | Prune to 5; move 2 cards out |
| 5 | Source primer | 2338–2377 | — | Remove; content distributed into board cards |
| 6 | Testimonials | 2383–2411 | — | Remove; one quote can ride press-clipping card |
| — | (new) | — | **§6 "Tools" section** | New: director bio + dev partners + honors |
| 7 | Signup | 2417–2431 | **§7 Join the Search** | Reframe copy |
| 8 | Footer | 2437–2490 | Footer | Keep |

---

## Task Order

Tasks are ordered to minimize broken intermediate states. Each task ends with a commit; the site should be visually navigable after every commit (even if some sections are still old).

1. Hero → Landing (warmer, simpler)
2. Bridge → Bug-led spiral transition
3. Three thematic cards (new section)
4. Mystery hook line (new section)
5. Detective board pruning (8 → 5)
6. Tools section (new — absorbs telegram, punchcard, primer info, Leibniz epigraph)
7. Remove obsolete sections (epigraph, primer, testimonials)
8. Reframe signup as "Join the Search"
9. Bug-as-navigator polish across sections
10. Tonal pass — copy & emphasis sweep

---

### Task 1: Landing page — strip back the hero, lean warmer

**Goal:** Just title + "A Feature Film Based on the Acclaimed Novel by Richard Powers" tagline. Remove eyebrow block, logline-decrypt, credits column, scroll cue arrow text. Keep topbar (FOLIO badge etc.) but make it sparer. Switch title to a warmer treatment using Lora italic (already loaded).

**Files:**
- Modify: `index.html:1988-2038` (hero markup)
- Modify: `index.html:226-321` (hero CSS — `.title`, `.eyebrow`, `.logline-wrap`, `.credits`, `.scroll-cue`)

- [ ] **Step 1: Replace hero markup**

Replace the entire `<header class="hero">…</header>` block (lines 1988–2038) with:

```html
<header class="hero">

  <div class="topbar">
    <div class="doc">
      <span>FOLIO 01 / IV</span>
    </div>
    <div class="doc">
      <span>SHOOTING · Q3 2026</span>
    </div>
  </div>

  <div class="hero-grid">
    <h1 class="title" aria-label="The Gold Bug Variations">
      <span class="row r1">The&nbsp;Gold</span>
      <span class="row r2">Bug</span>
      <span class="row r3">Variations</span>
    </h1>

    <p class="tagline">A feature film based on the acclaimed novel by <em>Richard Powers</em>.</p>
  </div>

  <div class="scroll-cue" aria-hidden="true">
    <span class="arrow">↓</span>
  </div>
</header>
```

Notes:
- Title rows now use mixed-case "The Gold / Bug / Variations" to match the warmer treatment (current is ALL CAPS, contributes to the techy/intellectual feel).
- "scroll to follow" copy gone — just an arrow remains.
- Topbar stripped of the "TRANSMISSION ENCRYPTED" / "POE SUBSTITUTION" lines.

- [ ] **Step 2: Update hero CSS — warmer title, kill removed selectors**

In `index.html` between approx. lines 226 and 321, replace:

```css
.title {
  grid-column: 1 / span 12;
  font-family: var(--grot);
  font-weight: 700;
  font-stretch: 125%;
  font-size: clamp(56px, 11.4vw, 184px);
  line-height: 0.86;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  margin: 28px 0 0;
  color: #14202E;
}
```

with:

```css
.title {
  grid-column: 1 / span 12;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(64px, 13vw, 200px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  text-transform: none;
  margin: 28px 0 0;
  color: #14202E;
}
.tagline {
  grid-column: 2 / span 10;
  margin-top: clamp(28px, 5vh, 56px);
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(18px, 1.6vw, 24px);
  line-height: 1.45;
  color: rgba(20,32,46,0.78);
  text-align: center;
}
.tagline em { color: var(--gold); font-style: italic; }
```

Then delete the now-unused selectors `.eyebrow`, `.logline-wrap`, `.logline-wrap .label`, `.credits`, `.credits b`, and `.title .amp` (search and remove their blocks). Update the `@keyframes heroFadeIn` animation list (line ~251) to reference only the elements that remain:

```css
.tagline, .scroll-cue, .topbar {
  opacity: 0;
  animation: heroFadeIn 800ms cubic-bezier(.2,.7,.2,1) 850ms forwards;
}
.scroll-cue { animation-delay: 1300ms; }
```

And in the reduced-motion block:

```css
@media (prefers-reduced-motion: reduce) {
  .title .row, .tagline, .scroll-cue, .topbar {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
```

- [ ] **Step 3: Update scroll-cue copy**

Find the `.scroll-cue` rule (≈ line 307) and update its content rule — it currently shows "Scroll to follow" via the markup; since we removed the text node, no CSS change is needed for content. Verify the arrow still pulses.

- [ ] **Step 4: Browser-preview check**

Run `python3 -m http.server 8080` from the worktree root, open `http://localhost:8080/`, confirm:
- Hero shows only title + tagline + topbar + arrow.
- Title is italic serif (Lora), feels warmer than the prior bold sans.
- No console errors (open DevTools).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Strip hero to title + tagline; warmer Lora-italic display"
```

---

### Task 2: Bridge → bug-led spiral strand transition

**Goal:** Replace the staff→helix morph with a simpler "single gold spiral strand drawn in by scroll, beetle traveling along it." The strand still gestures at the helix idea (so the producer's note is honored), but its narrative role is now: "follow the bug." Keep the Aria audio toggle.

**Files:**
- Modify: `index.html:2056-2092` (bridge markup)
- Modify: `index.html:323-482` (bridge CSS — `.bridge`, `.bridge-stage`, `.bridge-caption`, `.bridge-svg-wrap`, etc.)
- Modify: `index.html:2892-3108` (`§B HELIX MORPH` JS)

- [ ] **Step 1: Replace bridge markup**

Replace lines 2056–2092 with:

```html
<section class="bridge" id="bridge" aria-label="A spiral strand connecting music, code, and love">
  <div class="bridge-stage">

    <div class="bridge-caption" aria-hidden="false">
      <p class="cap-body">Bach wrote thirty variations on a single bass line. Watson and Crick read four letters into the spine of a cell. The film listens — patiently — for the strand they share.</p>
    </div>

    <div class="bridge-svg-wrap">
      <svg id="morph" viewBox="0 0 280 1000" preserveAspectRatio="none" aria-hidden="true">
        <g id="goldStrand" stroke="#D4AF37" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.9"></g>
        <g id="rungs" stroke="var(--bridge-fg, #14202E)" stroke-width="1" opacity="0"></g>
      </svg>
      <!-- Bug rides the strand. Position is set by JS based on scroll progress. -->
      <div class="strand-bug" id="strandBug" aria-hidden="true">
        <svg viewBox="0 0 28 38" width="28" height="38">
          <defs>
            <radialGradient id="bg2" cx="0.5" cy="0.35" r="0.6">
              <stop offset="0%" stop-color="#F5D060"/><stop offset="40%" stop-color="#C9A227"/><stop offset="100%" stop-color="#6B5210"/>
            </radialGradient>
          </defs>
          <ellipse cx="14" cy="22" rx="8" ry="13" fill="url(#bg2)" stroke="#6B5210" stroke-width="0.8"/>
          <ellipse cx="14" cy="7" rx="5" ry="4" fill="#3a2e1c"/>
          <line x1="14" y1="11" x2="14" y2="34" stroke="#2a1f10" stroke-width="0.7"/>
          <ellipse cx="11" cy="17" rx="2" ry="5" fill="#fff" opacity="0.25"/>
        </svg>
      </div>
    </div>
  </div>

  <div class="bridge-aria">
    <button class="audio-btn" id="ariaBtn" aria-pressed="false" aria-label="Toggle Bach Goldberg Aria, BWV 988">
      <span class="glyph" aria-hidden="true">
        <span class="bar b1"></span><span class="bar b2"></span><span class="bar b3"></span><span class="bar b4"></span>
      </span>
      <span class="audio-label">
        <span class="audio-meta">J.S. Bach · BWV 988</span>
        <span class="audio-status" id="ariaLabel">Aria · off</span>
      </span>
    </button>
  </div>
</section>
```

Removed: the section number "§ 02 · The Bridge", the "Music becomes a strand." heading, the right-side "A · T · G · C / Four bases. Four voices." caption block (its content moves to §3 thematic cards), the multi-strand `#lines` group, and the `#notes` group (no more music staff origin).

Kept: the gold strand, the rung group (we'll keep it for now — it gives the helix nod the producer asked for, faded in late), and the Aria button.

- [ ] **Step 2: Update bridge CSS**

In the `.bridge` block (≈ line 324), reduce the height from `260vh` to `180vh` (shorter scroll lane — single-strand draw doesn't need as much), and update the caption styles. Locate the `.bridge-caption` and right-side `.bridge-caption.right` selectors and replace with:

```css
.bridge-caption {
  position: sticky;
  top: 24vh;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.5;
  color: var(--bridge-fg, #14202E);
  max-width: 520px;
  padding: 0 var(--margin);
  margin: 0 auto;
  text-align: center;
}
.bridge-caption .cap-body { margin: 0; }

/* Bug riding the strand */
.strand-bug {
  position: absolute;
  width: 28px; height: 38px;
  pointer-events: none;
  transform-origin: center center;
  will-change: transform, top, left;
  opacity: 0;
  transition: opacity 400ms ease-out;
}
.bridge.bug-active .strand-bug { opacity: 1; }
```

Remove the stylesheet rules for `.cap-num`, `.cap-head`, `.bridge-caption.right` (you can leave them if other elements use them, but they're now unused).

- [ ] **Step 3: Replace the helix-morph JS with a spiral-strand renderer**

In the JS section (≈ line 2892, `§B HELIX MORPH`), replace the `setupHelixMorph` function body with a simpler renderer that:
- Draws a single sinusoidal strand from top to bottom of the viewBox, with amplitude growing 0 → max as scroll progress `t` goes 0 → 0.6.
- Past `t > 0.6`, fades in light DNA "rungs" so the helix idea is preserved.
- Positions the strand-bug at a y-position keyed off `t * H`, with x at `CX + amp*sin(...)` and rotation matching local strand tangent.

Replace the body of `setupHelixMorph()` with:

```javascript
function setupHelixMorph(){
  const svg = document.getElementById('morph');
  const goldG = document.getElementById('goldStrand');
  const rungsG = document.getElementById('rungs');
  const bug = document.getElementById('strandBug');
  const bridge = document.getElementById('bridge');
  const wrap = bridge.querySelector('.bridge-svg-wrap');
  if (!svg || !goldG || !bug) return;

  const W = 280, H = 1000;
  const SAMPLES = 220;
  const HELIX_AMP = 80;
  const HELIX_FREQ = 6;        // fewer turns than before — calmer, more elegant
  const CX = W/2;

  // Single strand path
  const goldPath = document.createElementNS('http://www.w3.org/2000/svg','path');
  goldG.appendChild(goldPath);

  // Optional rungs (the "helix nod") — drawn lightly, fade in late
  const RUNG_COUNT = 9;
  const rungs = [];
  for (let i = 0; i < RUNG_COUNT; i++){
    const ln = document.createElementNS('http://www.w3.org/2000/svg','line');
    rungsG.appendChild(ln);
    rungs.push(ln);
  }

  function strandX(y, t){
    const amp = HELIX_AMP * Math.min(1, t / 0.6);
    return CX + Math.sin((y / H) * HELIX_FREQ * Math.PI * 2) * amp;
  }

  function strandPathD(t){
    let d = '';
    for (let i = 0; i <= SAMPLES; i++){
      const u = i / SAMPLES;
      const y = u * H;
      const x = strandX(y, t);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
    }
    return d;
  }

  function render(t){
    goldPath.setAttribute('d', strandPathD(t));
    goldPath.setAttribute('opacity', Math.min(1, t * 1.2).toFixed(3));

    const rungOp = Math.max(0, Math.min(1, (t - 0.6) / 0.3));
    rungsG.setAttribute('opacity', rungOp.toFixed(3));
    for (let i = 0; i < RUNG_COUNT; i++){
      const phase = (i + 0.5) / RUNG_COUNT;
      const y = phase * H;
      const x1 = strandX(y, t);
      // Mirror of strand for second "rail" of the rung
      const x2 = CX - (x1 - CX);
      const ln = rungs[i];
      ln.setAttribute('x1', x1.toFixed(2));
      ln.setAttribute('y1', y.toFixed(2));
      ln.setAttribute('x2', x2.toFixed(2));
      ln.setAttribute('y2', y.toFixed(2));
      ln.setAttribute('stroke', (i % 2 === 0) ? 'currentColor' : '#D4AF37');
      ln.setAttribute('opacity', '0.55');
    }

    // Bug position — ride the strand. Convert SVG coords → CSS px inside .bridge-svg-wrap.
    const wrapRect = wrap.getBoundingClientRect();
    const yu = Math.min(0.96, Math.max(0.04, t)); // 4–96% down the viewBox
    const ySvg = yu * H;
    const xSvg = strandX(ySvg, t);
    const xPct = xSvg / W;
    const yPct = yu;
    const xPx = xPct * wrapRect.width;
    const yPx = yPct * wrapRect.height;

    // Tangent angle for bug rotation (point along the strand, head leading)
    const dy = 1;
    const ahead = strandX(ySvg + dy, t);
    const angleRad = Math.atan2(dy, ahead - xSvg);
    const angleDeg = angleRad * 180 / Math.PI - 90; // bug points along strand, head down

    bug.style.transform =
      `translate(${(xPx - 14).toFixed(1)}px, ${(yPx - 19).toFixed(1)}px) rotate(${angleDeg.toFixed(1)}deg)`;

    bridge.classList.toggle('bug-active', t > 0.02 && t < 0.98);
  }

  function getT(){
    const r = bridge.getBoundingClientRect();
    const total = bridge.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const scrolled = -r.top;
    return Math.max(0, Math.min(1, scrolled / total));
  }

  function tintBridge(t){
    const inkR = 0x14, inkG = 0x20, inkB = 0x2E;
    const boneR = 0xF0, boneG = 0xE6, boneB = 0xD2;
    const r = Math.round(inkR + (boneR - inkR) * t);
    const g = Math.round(inkG + (boneG - inkG) * t);
    const b = Math.round(inkB + (boneB - inkB) * t);
    bridge.style.setProperty('--bridge-fg', `rgb(${r},${g},${b})`);
    bridge.style.setProperty('--bridge-fg-mute', `rgba(${r},${g},${b},0.7)`);
  }

  let raf = false;
  function onScroll(){
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => {
      raf = false;
      const t = getT();
      render(t);
      tintBridge(t);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}
```

Delete the breath/breathPhase logic, the `STRANDS` loop, the `notes` group, and any references to `#lines` or `#notes` (those elements are now gone from the DOM).

- [ ] **Step 4: Browser preview**

Reload `http://localhost:8080/`. Scroll through the bridge section and verify:
- A single gold spiral strand draws in as you scroll.
- The bug travels down the strand, rotated to ride along it.
- Past the midpoint, light cross-rungs fade in (helix gesture).
- No console errors. Aria button still toggles audio.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Replace staff→helix morph with bug-led gold spiral strand"
```

---

### Task 3: Three thematic cards — "complexity from simple elements"

**Goal:** Insert a new section after the bridge with three cards:
- **Four bass notes** of music
- **Four base molecules** of DNA
- **Two intertwined love stories**

Establishes the "complexity from simple elements" frame before the mystery hook.

**Files:**
- Modify: `index.html` (insert new section after `</section>` closing the bridge, ≈ line 2092)
- Modify: `index.html` (add CSS, place near existing primer styles ≈ line 1584)

- [ ] **Step 1: Insert markup after the bridge section**

Right after the bridge `</section>` closing tag (≈ line 2092), and before the next `<!-- §5 INVESTIGATION -->` block, add:

```html
<!-- ============================================================
     §3  THEMATIC CARDS — three simple-elements that make the film
     ============================================================ -->
<section class="thematic" id="thematic" aria-label="Three simple elements">
  <div class="thematic-head">
    <p class="thematic-lede">Complexity, from a few simple things.</p>
  </div>
  <div class="thematic-grid">

    <article class="thematic-card">
      <span class="thematic-num">Four</span>
      <h3>Bass notes of music.</h3>
      <p>Bach builds thirty variations — and the architecture of the Western canon — on a handful of repeating tones.</p>
    </article>

    <article class="thematic-card">
      <span class="thematic-num">Four</span>
      <h3>Base molecules of DNA.</h3>
      <p>A · T · G · C. From four letters, every living thing is spelled out, line after recursive line.</p>
    </article>

    <article class="thematic-card">
      <span class="thematic-num">Two</span>
      <h3>Intertwined love stories.</h3>
      <p>One in 1957, one in 1985 — separate, mirrored, eventually rhymed. The film's two voices, twenty-eight years apart.</p>
    </article>

  </div>
</section>
```

- [ ] **Step 2: Add thematic-section CSS**

Place this near the existing `.primer` styles (≈ line 1584):

```css
/* ---------- §3 Thematic cards (simple → complex motif) ---------- */
.thematic {
  background: var(--paper);
  color: #14202E;
  padding: clamp(80px, 14vh, 160px) var(--margin);
  border-bottom: 1px solid var(--paper-rule);
}
.thematic-head { max-width: 720px; margin: 0 auto clamp(40px, 7vh, 80px); text-align: center; }
.thematic-lede {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(22px, 2.4vw, 34px);
  line-height: 1.35;
  color: rgba(20,32,46,0.85);
  margin: 0;
}
.thematic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 48px);
  max-width: 1200px;
  margin: 0 auto;
}
.thematic-card {
  background: var(--paper-2);
  border: 1px solid var(--paper-rule);
  padding: clamp(28px, 4vw, 44px);
  border-radius: 2px;
}
.thematic-num {
  display: block;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(48px, 6vw, 80px);
  line-height: 1;
  color: var(--gold);
  margin-bottom: 12px;
}
.thematic-card h3 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: clamp(20px, 1.8vw, 26px);
  line-height: 1.25;
  margin: 0 0 14px;
  color: #14202E;
}
.thematic-card p {
  font-family: var(--serif);
  font-size: clamp(15px, 1.1vw, 17px);
  line-height: 1.55;
  color: rgba(20,32,46,0.78);
  margin: 0;
}
@media (max-width: 760px){
  .thematic-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Browser preview**

Reload, scroll to confirm new section sits cleanly between bridge and investigation. Three cards in a row on desktop, stacked on mobile. Gold "Four / Four / Two" reads as a triplet motif.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add three thematic cards — four notes, four bases, two love stories"
```

---

### Task 4: Mystery hook line

**Goal:** Single dramatic caption between the thematic cards and the detective board: *"The mystery of the disappearance of a brilliant scientist poised to discover the ultimate code for life."*

**Files:**
- Modify: `index.html` (insert section before investigation, ≈ line 2095)
- Modify: `index.html` (add small CSS block)

- [ ] **Step 1: Insert markup**

Right before the `<!-- §5 INVESTIGATION -->` comment block (≈ line 2095), add:

```html
<!-- ============================================================
     §4  MYSTERY HOOK — single caption setting up the case
     ============================================================ -->
<section class="hook" aria-label="The mystery">
  <p class="hook-text">The mystery of the disappearance of a brilliant scientist poised to discover the ultimate code for life.</p>
</section>
```

- [ ] **Step 2: Add CSS**

Add near the thematic CSS:

```css
/* ---------- §4 Mystery hook ---------- */
.hook {
  background: linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%);
  padding: clamp(80px, 16vh, 180px) var(--margin);
  text-align: center;
}
.hook-text {
  max-width: 880px;
  margin: 0 auto;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(26px, 3vw, 44px);
  line-height: 1.3;
  color: #14202E;
}
```

- [ ] **Step 3: Browser preview & commit**

Reload, confirm hook sits between thematic and investigation, reads as a hinge. Then:

```bash
git add index.html
git commit -m "Add mystery hook line between thematic cards and detective board"
```

---

### Task 5: Detective board — prune from 8 to 5 cards

**Goal:** Keep the 5 most evocative cards; relocate director-bio (telegram) and dev-partners (punchcard) to the new Tools section. Update the board's heading copy to lean less procedural.

**Files:**
- Modify: `index.html:2098-2332` (investigation section)
- The `<div class="artifact telegram">` and `<div class="artifact punchcard">` blocks will be **temporarily removed** here; they are added back in Task 6 inside the Tools section.

**Cards to keep (5):**
1. Notebook (lab journal) — lines ≈ 2118–2143
2. Polaroid (microscope + director's note on back) — lines ≈ 2146–2182
3. Catalog card (Powers, source) — lines ≈ 2185–2200
4. Canister (Bach score) — lines ≈ 2220–2246
5. Cast list — lines ≈ 2249–2268

**Cards to remove (3):**
- Telegram (director bio) — lines ≈ 2203–2217 → move to Tools (Task 6)
- Punchcard (dev partners) — lines ≈ 2271–2289 → move to Tools (Task 6)
- Press clipping — lines ≈ 2292–2307 → delete entirely; testimonial copy moves into footer (or Tools) per Task 7

- [ ] **Step 1: Update the desk header copy**

In the `<div class="desk-head">` block (≈ line 2101), replace the inner content with warmer/more emotional framing:

```html
<div class="desk-head">
  <div>
    <div class="marque">
      <b>§ 05 · The case file</b><br>
      Jan O'Deigh's desk · Brooklyn Public Library · 1985
    </div>
    <h2>A quiet detective story without a crime.</h2>
    <p class="sub">Three readers. One vanished life. A handful of artifacts laid out on a desk at three in the morning.</p>
  </div>
  <button class="reset-btn" id="resetBtn" aria-label="Reset desk">↺ Reset desk</button>
</div>
```

Note: removed the all-caps `decrypt-head` treatments on `<h2>` and the sub `<p>` because they were "techy" — switched to plain serif. Removed the inline drag/click hint from the sub copy (it remains as the floating `#hint` overlay).

- [ ] **Step 2: Cut the telegram, punchcard, and press-clipping artifact blocks**

Delete:
- The `<!-- 4 · Telegram from director -->` comment plus the `<div class="artifact telegram" data-art="telegram">…</div>` block (≈ 2202–2217). Save the inner copy in your editor scratch — Task 6 reuses it.
- The `<!-- 7 · Punchcard -->` comment plus the `<div class="artifact punchcard" data-art="punchcard">…</div>` block (≈ 2270–2289). Save copy.
- The `<!-- 8 · Press clipping -->` comment plus the `<div class="artifact clipping" data-art="clipping">…</div>` block (≈ 2291–2307). Delete entirely.

- [ ] **Step 3: Verify the JS doesn't reference removed `data-art` values by literal**

Search `index.html` for `data-art="telegram"`, `data-art="punchcard"`, and `data-art="clipping"`:

```bash
grep -n 'data-art="\(telegram\|punchcard\|clipping\)"' index.html
```

Expected: only the markup occurrences we deleted. The investigation JS (`§D INVESTIGATION` ≈ line 3250) iterates over `.artifact` elements generically, so removing them is safe. If grep shows no other matches, proceed.

- [ ] **Step 4: Confirm card layout still works**

The `case-board` container probably uses absolute positioning or a randomized layout for cards. Open the board in browser, check: 5 cards distribute pleasantly without empty patches. If layout JS hard-codes positions for 8 cards, find and adjust:

```bash
grep -n "telegram\|punchcard\|clipping\|cardPositions\|artifactSlots" index.html
```

Inspect any matches and remove references for the deleted arts (e.g. positions array entries).

- [ ] **Step 5: Browser preview & commit**

Reload, drag/flip cards, confirm 5 cards present and the desk doesn't look empty. Commit:

```bash
git add index.html
git commit -m "Pare detective board to five artifacts — extract director bio + partners"
```

---

### Task 6: Tools section — director bio + project support

**Goal:** New section after the detective board: "The tools used to work out the mystery." Hosts the director bio (formerly telegram), the development partners (formerly punchcard), and a small honors/credits block.

**Files:**
- Modify: `index.html` (insert section between investigation `</section>` ≈ line 2332 and the next section)

- [ ] **Step 1: Insert Tools markup**

After the investigation section's closing `</section>` (≈ line 2332), insert:

```html
<!-- ============================================================
     §6  TOOLS — the kit being used to work out the mystery
     ============================================================ -->
<section class="tools" id="tools" aria-label="The tools — director, partners, honors">
  <div class="tools-head">
    <span class="tools-num">§ 06 · The tools</span>
    <h2>The kit on the desk.</h2>
    <p class="tools-sub">A director. A handful of institutions. Three Sloan grants. Everything we are using to follow the strand.</p>
  </div>

  <div class="tools-grid">

    <article class="tool-card tool-director">
      <header>
        <span class="tool-eyebrow">The director</span>
        <h3>Mark A. Levinson</h3>
      </header>
      <p>Director of <a href="https://en.wikipedia.org/wiki/Particle_Fever" target="_blank" rel="noopener">Particle Fever</a> (2013) — Robert Sievers DaVinci Award · Stephen Hawking Medal for Science Communication. Former physicist. Forty-five feature films, including close collaborations with Anthony Minghella.</p>
      <blockquote>"Films and formulas — both are theories about how the universe operates."</blockquote>
    </article>

    <article class="tool-card tool-partners">
      <header>
        <span class="tool-eyebrow">Development partners</span>
        <h3>The institutions reading along.</h3>
      </header>
      <ul class="partners-list">
        <li><b>Sundance Institute</b><span>Screenwriters &amp; Directors Lab</span></li>
        <li><b>Film Independent</b><span>Fast Track · Producers Lab</span></li>
        <li><b>Sloan Foundation</b><span>Three Science-in-Fiction grants</span></li>
        <li><b>Gotham (IFP)</b><span>No-Borders International</span></li>
      </ul>
    </article>

    <article class="tool-card tool-shooting">
      <header>
        <span class="tool-eyebrow">Production</span>
        <h3>Shooting Q3 2026.</h3>
      </header>
      <p>Principal photography across <em>New York, Illinois, and Leipzig</em>. We are looking for financial partners passionate about science, music, love, and the way they intertwine.</p>
    </article>

  </div>
</section>
```

- [ ] **Step 2: Add Tools CSS**

```css
/* ---------- §6 Tools ---------- */
.tools {
  background: var(--paper);
  color: #14202E;
  padding: clamp(80px, 14vh, 160px) var(--margin);
  border-bottom: 1px solid var(--paper-rule);
}
.tools-head { max-width: 720px; margin: 0 auto clamp(40px, 7vh, 80px); text-align: center; }
.tools-num {
  display: block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}
.tools-head h2 {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1.15;
  margin: 0 0 18px;
  color: #14202E;
}
.tools-sub {
  font-family: var(--serif);
  font-size: clamp(16px, 1.2vw, 19px);
  line-height: 1.5;
  color: rgba(20,32,46,0.7);
  margin: 0;
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 48px);
  max-width: 1200px;
  margin: 0 auto;
}
.tool-card {
  background: var(--paper-2);
  border: 1px solid var(--paper-rule);
  padding: clamp(28px, 4vw, 44px);
  border-radius: 2px;
}
.tool-card header { margin-bottom: 16px; }
.tool-eyebrow {
  display: block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}
.tool-card h3 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: clamp(20px, 1.8vw, 26px);
  line-height: 1.25;
  margin: 0;
  color: #14202E;
}
.tool-card p, .tool-card blockquote {
  font-family: var(--serif);
  font-size: clamp(15px, 1.1vw, 17px);
  line-height: 1.55;
  color: rgba(20,32,46,0.78);
  margin: 0 0 12px;
}
.tool-card blockquote {
  font-style: italic;
  border-left: 2px solid var(--gold);
  padding-left: 14px;
  margin-top: 16px;
  color: rgba(20,32,46,0.85);
}
.tool-card a { color: var(--gold); text-decoration: underline; text-underline-offset: 2px; }
.partners-list { list-style: none; padding: 0; margin: 0; }
.partners-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--paper-rule);
  font-family: var(--serif);
  font-size: clamp(15px, 1.1vw, 17px);
}
.partners-list li:last-child { border-bottom: 0; }
.partners-list b { display: block; font-weight: 600; color: #14202E; }
.partners-list span { font-size: 13px; color: rgba(20,32,46,0.65); font-style: italic; }
@media (max-width: 760px){
  .tools-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Browser preview**

Reload, scroll to Tools section, confirm three cards (Director / Partners / Production) render cleanly with consistent typography. The partners list should look like a register, not a hero.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add Tools section — director bio, partners, production"
```

---

### Task 7: Remove obsolete sections (epigraph, source primer, testimonials)

**Goal:** Clean up sections whose content has been redistributed:
- The Leibniz epigraph — dropped (content was a stand-alone quote that no longer fits the warmer flow).
- The Poe/Bach/Powers source primer — its three lineages are now narrated through the detective-board cards (catalog, canister, etc.) and the thematic cards.
- The praise testimonials carousel — kept as a single quote on the press-clipping card was removed, so we surface one quote elsewhere.

**Files:**
- Modify: `index.html:2041-2050` (epigraph)
- Modify: `index.html:2335-2377` (primer)
- Modify: `index.html:2380-2411` (testimonials)

- [ ] **Step 1: Delete the three sections in markup**

Remove all three blocks:
- Lines 2041–2050: `<!-- EPIGRAPH … --> <section class="epigraph paper" …>…</section>`.
- Lines 2335–2377: `<!-- §4 SOURCE-MATERIAL PRIMER … --> <section class="primer" id="source" …>…</section>`.
- Lines 2380–2411: `<!-- §5 TESTIMONIALS … --> <section class="testimonials" …>…</section>`.

- [ ] **Step 2: Surface one praise quote inside the Tools section**

In the Tools section markup (Task 6), inside the `.tool-shooting` card (or as a new fourth card if grid layout is comfortable), add the strongest pull-quote:

```html
<blockquote class="tool-quote">
  <p>"A formidable masterpiece — rewarding in every sense but, in particular, a profoundly moving love story."</p>
  <cite>— Kirkus, on the Powers novel</cite>
</blockquote>
```

(With CSS in `.tool-card blockquote.tool-quote { ... }` if differentiating styling is wanted; otherwise it inherits.)

- [ ] **Step 3: Update internal anchor references**

The footer (lines 2453–2482) links to `#source` and `#bridge`. Update:
- `#source` references → either `#tools` or remove those links if the content is no longer indexed.
- `#bridge` "Synopsis" link is fine (bridge still exists).

```bash
grep -n 'href="#source"\|href="#bridge"\|href="#investigation"' index.html
```

For each `#source` hit, either retarget to `#tools` or delete the line. Confirm `#bridge` and `#investigation` IDs still exist in the markup (they do — bridge is in Task 2 markup, investigation is unchanged in Task 5).

- [ ] **Step 4: Remove now-orphaned CSS**

Search for and remove unused CSS rules:

```bash
grep -n "\.epigraph\|\.primer\|\.testimonial\b\|\.testimonials" index.html
```

Delete the rule blocks for `.epigraph`, `.primer`, `.primer-head`, `.primer-grid`, `.primer-col`, `.primer-num`, `.primer-date`, `.primer-by`, `.primer-sub`, `.testimonials`, `.testimonials-head`, `.testimonial`, `.testimonial-dots`, `.testimonials-stage` (and any related sub-selectors). Approx. lines 1526–1713.

- [ ] **Step 5: Remove orphaned JS**

Search for testimonials carousel logic:

```bash
grep -n "testimonial\|testimonials" index.html
```

Delete the `Testimonials carousel` JS block (≈ line 3548–3575).

- [ ] **Step 6: Browser preview**

Reload, confirm:
- No layout gaps between bridge → thematic → hook → investigation → tools.
- No broken anchor links in footer.
- No console errors (carousel JS not throwing).

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "Remove epigraph, source primer, and testimonials — content redistributed"
```

---

### Task 8: Reframe signup as "Join the Search"

**Goal:** Rewrite the signup section copy from the procedural "correspondence" framing to a warmer "join the search" framing.

**Files:**
- Modify: `index.html:2417-2431` (signup section)

- [ ] **Step 1: Replace signup markup**

Replace the entire `<section class="signup" id="signup" …>…</section>` block with:

```html
<section class="signup" id="signup" aria-label="Join the search">
  <div class="envelope" id="envelopeArt">
    <div class="side front">
      <div class="eyebrow">Folio II · in the post</div>
      <div class="stamp" aria-hidden="true"></div>
      <h2>Join the <em>search</em>.</h2>
      <p class="intro">One letter per quarter — production notes, set photography from Urbana and Brooklyn, and an occasional clue. We will not write to you for any other reason.</p>
      <form id="signupForm" novalidate>
        <input type="email" required placeholder="your.address@correspondent.com" id="emailInput" autocomplete="email">
        <button type="submit">Send ↗</button>
      </form>
      <div class="ok" id="envOk">Thank you. The next letter is in the post.</div>
    </div>
  </div>
</section>
```

Changes:
- `Join the *correspondence*` → `Join the *search*`.
- "One transmission per quarter" → "One letter per quarter".
- "an occasional cipher" → "an occasional clue" (less techy).
- "the next folio is in the post" → "the next letter is in the post".

- [ ] **Step 2: Browser preview & commit**

Reload, scroll to signup, confirm new copy reads warmer. Commit:

```bash
git add index.html
git commit -m "Reframe signup as Join the Search; warmer language"
```

---

### Task 9: Bug-as-navigator polish

**Goal:** Make the Gold Bug a deliberate visual signal that ties pages together. Beyond the bridge ride (Task 2), give the bug subtle navigator roles in two places:
- After the hero: a static bug glyph next to the "↓" arrow scroll cue, gold-and-glowing.
- After the mystery hook: bug appears at the bottom of the hook section, "leading" the reader into the detective board.

**Files:**
- Modify: `index.html:2034-2037` (hero scroll cue)
- Modify: `index.html` (hook section, added in Task 4)

- [ ] **Step 1: Add bug glyph to scroll cue**

In the hero `.scroll-cue` markup, replace the existing arrow span with:

```html
<div class="scroll-cue" aria-hidden="true">
  <svg class="cue-bug" viewBox="0 0 28 38" width="20" height="28">
    <ellipse cx="14" cy="22" rx="8" ry="13" fill="#C9A227" stroke="#6B5210" stroke-width="0.8"/>
    <ellipse cx="14" cy="7" rx="5" ry="4" fill="#3a2e1c"/>
    <line x1="14" y1="11" x2="14" y2="34" stroke="#2a1f10" stroke-width="0.7"/>
  </svg>
  <span class="arrow">↓</span>
</div>
```

CSS addition near `.scroll-cue`:

```css
.scroll-cue .cue-bug { display: block; margin: 0 auto 6px; opacity: 0.85; }
```

- [ ] **Step 2: Add a tiny bug glyph at the bottom of the hook section**

Append inside the hook section markup (after the `<p class="hook-text">…</p>`):

```html
<div class="hook-bug" aria-hidden="true">
  <svg viewBox="0 0 28 38" width="22" height="30">
    <ellipse cx="14" cy="22" rx="8" ry="13" fill="#C9A227" stroke="#6B5210" stroke-width="0.8"/>
    <ellipse cx="14" cy="7" rx="5" ry="4" fill="#3a2e1c"/>
    <line x1="14" y1="11" x2="14" y2="34" stroke="#2a1f10" stroke-width="0.7"/>
  </svg>
</div>
```

CSS:

```css
.hook-bug { margin-top: clamp(40px, 6vh, 80px); }
.hook-bug svg { display: block; margin: 0 auto; opacity: 0.8; }
```

- [ ] **Step 3: Browser preview & commit**

Reload. Confirm bug appears in scroll cue, in hook footer. The pre-existing scuttling cursor-bug in the investigation desk continues to work (verified in Task 5).

```bash
git add index.html
git commit -m "Use the Gold Bug as navigator across hero and hook"
```

---

### Task 10: Tonal pass — copy & emphasis sweep

**Goal:** A final read-through to sand off any remaining "techy/intellectual" language. Use the synthesis brief as the rubric: warmer, more emotional, love story foregrounded, not a tech project.

**Files:**
- Modify: `index.html` (copy edits scattered)

- [ ] **Step 1: Copy diff candidates — search & replace**

Run these greps and consider each match:

```bash
grep -n "TRANSMISSION\|ENCRYPTED\|cipher\|cryptograph\|substitution\|decrypt" index.html
```

Likely changes:
- "TRANSMISSION ENCRYPTED" badge in topbar (already removed in Task 1, verify).
- The `decrypt-head` and `decrypt` JS classes — these animate text. Keep the mechanism (it's pretty), but audit the copy on each `data-text=...` to ensure none read as cold/proceduralese.
- The cipher-key floating widget (≈ line 2494): consider hiding by default with a small "Show key" affordance — the cipher is now an Easter egg, not a primary frame.

For the cipher-key, change:

```html
<div class="cipher-key collapsed" id="cipherKey" role="button" aria-label="Open cipher key" tabindex="0"></div>
```

…leave as-is structurally (it's already collapsed by default), but verify the `cursor-trail` cipher cursor doesn't leak into Tools/signup sections — it should already be scoped to investigation only.

- [ ] **Step 2: README + meta updates**

Open `README.md` and `CHANGELOG.md`. Add a brief line in CHANGELOG describing this restructure (consistent with the existing entries).

```bash
head -20 CHANGELOG.md
```

Append a new entry at the top (above the most recent commit's entry, matching style).

- [ ] **Step 3: Final browser preview — full scroll-through**

Open the site, scroll top-to-bottom, and verify the new arc:
- §1 Landing: title + tagline. Warm.
- §2 Bridge: bug rides gold spiral.
- §3 Three thematic cards: 4 / 4 / 2.
- §4 Hook: single mystery line.
- §5 Detective board: 5 cards.
- §6 Tools: director / partners / production.
- §7 Join the Search.
- Footer.

Each transition should feel like a held breath into the next, not a bump.

- [ ] **Step 4: Commit**

```bash
git add index.html README.md CHANGELOG.md
git commit -m "Tonal pass — warmer copy throughout"
```

---

## Out of scope / explicit non-goals

- No new fonts or third-party assets (Lora and Caveat already loaded; we're using them more, not adding more).
- No build pipeline / bundling — site stays single-file.
- The Easter-egg glyph hunt and beetle shower are kept as-is. They're whimsical and the producer/director both like them.
- Mobile responsiveness: existing breakpoints are honored; verify but don't redesign.
- The `signup-endpoint` Apps Script remains unchanged.

## Resolved decisions (from the user, 2026-05-09)

1. **Hero typography:** Use Lora italic semibold as planned — most legible warm option among already-loaded fonts. No new font imports.
2. **Cast list (Task 5):** Role-only. Cast-card body becomes role descriptors with no actor names. Suggested rewrite:

   ```html
   <ul>
     <li><i>Dr. Stuart Ressler</i><span>· molecular geneticist, vanished</span></li>
     <li><i>Jan O'Deigh</i><span>· research librarian, Brooklyn</span></li>
     <li><i>Franklin Todd</i><span>· graduate student, art historian</span></li>
     <li><i>Jeannette Koss</i><span>· mathematician, Urbana 1957</span></li>
     <li><i>Dr. Cyfer</i><span>· head of the Cyfer lab</span></li>
   </ul>
   ```

   And update the card heading from `<h4>CAST · CONFIDENTIAL</h4>` to `<h4>The four voices</h4>` with a sub `<div class="stamp">DRAMATIS PERSONAE</div>` (or similar warmer stamp).

3. **Leibniz epigraph (Task 6 / Tools):** Survives as a small italicized line at the top of the Tools section, above `tools-num`. Add to the Tools markup:

   ```html
   <div class="tools-head">
     <blockquote class="tools-epigraph">
       <p>"Music is the pleasure the human mind experiences from counting without being aware that it is counting."</p>
       <cite>— Gottfried Leibniz</cite>
     </blockquote>
     <span class="tools-num">§ 06 · The tools</span>
     <h2>The kit on the desk.</h2>
     ...
   ```

   And matching CSS:

   ```css
   .tools-epigraph {
     max-width: 600px;
     margin: 0 auto clamp(28px, 4vh, 48px);
     font-family: var(--serif);
     font-style: italic;
     font-size: clamp(15px, 1.15vw, 18px);
     line-height: 1.5;
     color: rgba(20,32,46,0.65);
     border: 0;
     padding: 0;
   }
   .tools-epigraph p { margin: 0 0 6px; }
   .tools-epigraph cite {
     display: block;
     font-style: normal;
     font-family: var(--mono);
     font-size: 11px;
     letter-spacing: 0.18em;
     text-transform: uppercase;
     color: rgba(20,32,46,0.5);
   }
   ```

   This means Task 7 step 1 (delete the standalone epigraph section) still happens — the quote relocates here.
