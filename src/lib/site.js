/* ============================================================
   GBV — combined behavior (ported verbatim from the original
   single-file site). Exposed as initSite(), invoked from the
   page component's onMount so it runs only in the browser.

   §A  Cipher (Poe substitution + decrypt animations + cursor)
   §B  Helix morph (scroll-driven SVG)
   §C  Aria audio toggle
   §D  Detective board: card drag/flip, beetle, red string, signup
   §E  Section observer (mode tinting), boot
   ============================================================ */
export function initSite() {
'use strict';

/* =========== §A  CIPHER =========== */

// Poe's published substitutions, extended to a full alphabet.
const CIPHER = {
  A:'5',  B:'2',  C:'—', D:'†', E:'8',
  F:'¶',  G:'.',  H:'‡', I:'(', J:')',
  K:';',  L:'?',  M:']', N:'¢', O:':',
  P:'[',  Q:'*',  R:'0', S:'1', T:'3',
  U:'4',  V:'6',  W:'7', X:'9', Y:'$',
  Z:'/'
};
const ALPHABET = Object.keys(CIPHER);
const SYMBOLS  = Object.values(CIPHER);

function encChar(ch){
  const u = ch.toUpperCase();
  return CIPHER[u] || ch;
}

function buildCipher(target, text){
  target.classList.add('cipher');
  target.innerHTML = '';
  const chars = [...text];
  chars.forEach((c, i) => {
    if (c === ' '){
      const sp = document.createElement('span');
      sp.className = 'sp';
      sp.textContent = ' ';
      target.appendChild(sp);
      return;
    }
    const span = document.createElement('span');
    span.className = 'ch';
    span.dataset.target = c;
    span.dataset.idx = i;
    span.textContent = encChar(c);
    target.appendChild(span);
  });
  return target.querySelectorAll('.ch');
}

function decryptElement(el){
  if (el.dataset.decrypted === '1' || el.dataset.decrypting === '1') return;
  el.dataset.decrypting = '1';
  if (!el.dataset.built){
    buildCipher(el, el.dataset.text);
    el.dataset.built = '1';
  }
  const chars = el.querySelectorAll('.ch');
  // Sped-up timings — was perChar=40, startDelay=i*12, cycles=6+rand(5).
  // Now ~2× faster across the board so long card-back synopses don't
  // sit half-decoded for ~6 s before settling.
  const perChar = 20;

  chars.forEach((ch, i) => {
    const target = ch.dataset.target;
    const isLetter = !!CIPHER[target.toUpperCase()];
    const startDelay = i * 6;

    if (!isLetter){
      setTimeout(() => { ch.classList.add('solved'); ch.textContent = target; }, startDelay);
      return;
    }
    let cycles = 3 + Math.floor(Math.random() * 3);
    let n = 0;
    const tick = () => {
      if (n < cycles){
        ch.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        n++;
        setTimeout(tick, perChar);
      } else {
        ch.textContent = target;
        ch.classList.add('solved');
      }
    };
    setTimeout(tick, startDelay);
  });

  setTimeout(() => {
    el.dataset.decrypted = '1';
    el.dataset.decrypting = '';
    el.classList.remove('cipher');           // restore inherited typography
    wrapWords(el);
  }, perChar * 6 + chars.length * 6 + 60);
}

function wrapWords(el){
  const nodes = [...el.childNodes];
  const items = [];
  let buf = [];
  nodes.forEach(node => {
    if (node.nodeType === 1 && node.classList && node.classList.contains('sp')){
      if (buf.length){ items.push({kind:'word', nodes: buf}); buf = []; }
      items.push({kind:'sp', node});
    } else {
      buf.push(node);
    }
  });
  if (buf.length) items.push({kind:'word', nodes: buf});
  el.innerHTML = '';
  items.forEach(item => {
    if (item.kind === 'sp'){ el.appendChild(item.node); return; }
    const w = document.createElement('span');
    w.className = 'word solved';
    item.nodes.forEach(n => w.appendChild(n));
    w.addEventListener('mouseenter', () => reEncryptWord(w));
    el.appendChild(w);
  });
}

function reEncryptWord(w){
  if (w.dataset.busy === '1') return;
  w.dataset.busy = '1';
  const chars = w.querySelectorAll('.ch');
  chars.forEach(ch => {
    const tU = ch.dataset.target.toUpperCase();
    if (!CIPHER[tU]) return;
    ch.classList.remove('solved');
    ch.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  });
  let n = 0;
  const cycles = 3;
  const tick = () => {
    if (n < cycles){
      chars.forEach(ch => {
        const tU = ch.dataset.target.toUpperCase();
        if (!CIPHER[tU]) return;
        ch.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      });
      n++;
      setTimeout(tick, 20);
    } else {
      chars.forEach(ch => {
        ch.textContent = ch.dataset.target;
        ch.classList.add('solved');
      });
      w.dataset.busy = '';
    }
  };
  setTimeout(tick, 40);
}

function initCipherTargets(){
  document.querySelectorAll('.decrypt, .decrypt-head').forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.dataset.text = text;
    el.textContent = '';
    buildCipher(el, text);
    el.dataset.built = '1';
  });
}

function setupDecryptObserver(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) decryptElement(e.target); });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
  document.querySelectorAll('.decrypt, .decrypt-head').forEach(el => io.observe(el));
}

/* Like decryptElement, but the final state keeps the mono cipher styling
   (font / weight / letter-spacing) and just swaps the gold color back to the
   surrounding body color via .decoded-mono. Used on card backs so the decoded
   text doesn't visually shrink back to small serif. */
function decryptCardElement(el){
  if (el.dataset.decrypted === '1' || el.dataset.decrypting === '1') return;
  el.dataset.decrypting = '1';
  if (!el.dataset.built){
    buildCipher(el, el.dataset.text);
    el.dataset.built = '1';
  }
  const chars = el.querySelectorAll('.ch');
  // Sped-up timings (matches decryptElement). Card-back synopses are
  // long; this halves the total decode time so the user reads English
  // sooner after flipping a card.
  const perChar = 20;

  chars.forEach((ch, i) => {
    const target = ch.dataset.target;
    const isLetter = !!CIPHER[target.toUpperCase()];
    const startDelay = i * 6;

    if (!isLetter){
      setTimeout(() => { ch.classList.add('solved'); ch.textContent = target; }, startDelay);
      return;
    }
    let cycles = 3 + Math.floor(Math.random() * 3);
    let n = 0;
    const tick = () => {
      if (n < cycles){
        ch.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        n++;
        setTimeout(tick, perChar);
      } else {
        ch.textContent = target;
        ch.classList.add('solved');
      }
    };
    setTimeout(tick, startDelay);
  });

  setTimeout(() => {
    el.dataset.decrypted = '1';
    el.dataset.decrypting = '';
    el.classList.remove('cipher');     // strip gold
    el.classList.add('decoded-mono');  // keep mono / 700 / tracking, body color
    wrapWords(el);
  }, perChar * 6 + chars.length * 6 + 60);
}

/* Decrypt-on-flip — every time a card is flipped to its back face, run the
   same Poe-cipher reveal on each text block inside the back. Inline emphasis
   (<em>) is flattened in the process; the cipher animation is the new
   emphasis. Re-runs on every flip-to-back, not just the first.
   Two-phase: render the cipher state immediately so the back face rotates
   into view fully encrypted, then start the cascade once the flip has
   settled so the user actually watches the glyphs unspool into prose. */
function decryptCardBack(back){
  if (!back) return;
  const targets = back.querySelectorAll('h3, h4, h5, p, blockquote, cite');
  const built = [];
  targets.forEach(el => {
    if (!el.dataset.cipherInit){
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;
      el.dataset.text = text;
      el.dataset.cipherInit = '1';
    }
    if (!el.dataset.text) return;
    el.dataset.decrypted = '';
    el.dataset.decrypting = '';
    el.dataset.built = '';
    el.classList.remove('decoded-mono');  // reset so re-flip restarts the reveal
    el.innerHTML = '';
    buildCipher(el, el.dataset.text);
    el.dataset.built = '1';
    built.push(el);
  });
  // The face takes ~550 ms to flip; the back becomes visible around 275 ms
  // in. Hold the static cipher just long enough to register, then start
  // the decode (was 480 ms — felt sluggish on long card-back synopses).
  setTimeout(() => {
    built.forEach(el => decryptCardElement(el));
  }, 240);
}

function buildFooterCipher(){
  const msg = "THE TREASURE WAS NEVER WHAT WE WERE LOOKING FOR. WE WERE LOOKING FOR A WAY TO STAY UP LATE TOGETHER, READING.";
  const el = document.getElementById('footCipher');
  el.innerHTML = '';
  [...msg].forEach(c => {
    if (c === ' '){
      const sp = document.createElement('span');
      sp.className = 'sp';
      sp.textContent = ' ';
      el.appendChild(sp);
      return;
    }
    const span = document.createElement('span');
    span.className = 'ch';
    span.dataset.target = c;
    span.textContent = encChar(c);
    el.appendChild(span);
  });

  // Cursor-radius decode: chars within ~110 px of the pointer briefly resolve
  // to plaintext, then re-scramble as the cursor leaves their orbit. The
  // buried message is meant to be earned, not handed over — drag the cursor
  // along it and the words appear under your hand.
  const chars = el.querySelectorAll('.ch');
  let raf = 0, cx = -1e6, cy = -1e6;
  const update = () => {
    raf = 0;
    chars.forEach(ch => {
      const r = ch.getBoundingClientRect();
      const mx = r.left + r.width / 2;
      const my = r.top  + r.height / 2;
      const dist = Math.hypot(cx - mx, cy - my);
      const peek = dist < 110;
      const isPeek = ch.classList.contains('peek');
      if (peek && !isPeek){
        ch.textContent = ch.dataset.target;
        ch.classList.add('peek');
      } else if (!peek && isPeek){
        ch.textContent = encChar(ch.dataset.target);
        ch.classList.remove('peek');
      }
    });
  };
  el.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  });
  el.addEventListener('mouseleave', () => {
    cx = -1e6; cy = -1e6;
    if (!raf) raf = requestAnimationFrame(update);
  });
}

function buildKey(){
  const key = document.getElementById('cipherKey');
  const REVERSE_CIPHER = Object.fromEntries(ALPHABET.map(L => [CIPHER[L], L]));
  const decChar = (g) => REVERSE_CIPHER[g] || g;
  // Trigger phrases (letters only, uppercased) that reveal the ‡ hunt.
  const TRIGGERS = new Set([
    'FOLLOWTHEBEETLE', 'GOLDBUG', 'GOLDENINSECT',
    'GOLDBUGVARIATIONS', 'ATGC', 'GFED'
  ]);
  const normLetters = (s) => (s || '').toUpperCase().replace(/[^A-Z]/g, '');

  function nudgeEggBadge(){
    const badge = document.getElementById('eggProgress');
    if (!badge) return;
    badge.classList.add('visible');
    badge.dataset.nudged = '1';
  }

  function expand(){
    key.classList.remove('collapsed'); key.classList.add('expanded');
    const cells = ALPHABET.map(L =>
      `<div class="key-cell"><div class="sym">${CIPHER[L]}</div><div class="let">${L}</div></div>`
    ).join('');
    key.innerHTML = `
      <div class="key-head">
        <span>POE · <b>SUBSTITUTION KEY</b></span>
        <span class="x" aria-label="Close">×</span>
      </div>
      <div class="key-decoder" data-mode="encode">
        <div class="key-mode-row">
          <label for="keyDecode">Try it — <span class="key-mode-label">encode a message</span></label>
          <div class="key-mode" role="group" aria-label="Encode or decode">
            <button type="button" class="key-mode-opt is-active" data-mode="encode">ENCODE</button>
            <button type="button" class="key-mode-opt" data-mode="decode">DECODE</button>
          </div>
        </div>
        <input id="keyDecode" type="text" autocomplete="off" spellcheck="false" maxlength="80" placeholder="your message">
        <output class="key-output" aria-live="polite"></output>
        <div class="key-hint" aria-live="polite">
          <span class="gold">‡</span> &nbsp;Five glyphs hidden in the typography &nbsp;<span class="gold">‡</span>
        </div>
      </div>
      <div class="key-grid">${cells}</div>
      <div class="key-foot">After E. A. Poe — "The Gold-Bug" — Dollar Newspaper, Philadelphia, 21 June 1843. Twenty-six glyphs · twenty-six letters · one buried thing.</div>`;
    key.querySelector('.x').addEventListener('click', e => { e.stopPropagation(); collapse(); });

    const decoder  = key.querySelector('.key-decoder');
    const input    = key.querySelector('#keyDecode');
    const output   = key.querySelector('.key-output');
    const hint     = key.querySelector('.key-hint');
    const modeLbl  = key.querySelector('.key-mode-label');
    const modeOpts = key.querySelectorAll('.key-mode-opt');

    const renderOutput = () => {
      const text = input.value;
      if (decoder.dataset.mode === 'encode'){
        output.textContent = [...text].map(c => c === ' ' ? ' ' : encChar(c)).join('');
        const norm = normLetters(text);
        if (norm.length >= 4 && TRIGGERS.has(norm)){
          hint.classList.add('show');
          nudgeEggBadge();
        } else {
          hint.classList.remove('show');
        }
      } else {
        // Decode: glyphs → plaintext. Untranslatable chars pass through.
        output.textContent = [...text].map(c => c === ' ' ? ' ' : decChar(c)).join('');
        hint.classList.remove('show');
      }
    };

    // Round-trip mode switch: instead of clearing, carry the current
    // output into the input so encode → decode shows the plaintext that
    // produced those glyphs (and vice versa). Same-mode clicks no-op.
    const setMode = (newMode) => {
      if (decoder.dataset.mode === newMode) return;
      decoder.dataset.mode = newMode;
      modeOpts.forEach(o => o.classList.toggle('is-active', o.dataset.mode === newMode));
      modeLbl.textContent = newMode === 'encode' ? 'encode a message' : 'decode a message';
      input.placeholder   = newMode === 'encode' ? 'your message' : 'paste glyphs (‡ † ¶ …)';
      const carried = output.textContent;
      if (carried) input.value = carried;
      hint.classList.remove('show');
      renderOutput();
      input.focus();
    };

    modeOpts.forEach(opt => {
      opt.addEventListener('click', (e) => { e.stopPropagation(); setMode(opt.dataset.mode); });
      ['pointerdown','keydown'].forEach(ev =>
        opt.addEventListener(ev, e => e.stopPropagation())
      );
    });
    input.addEventListener('input', renderOutput);
    // Stop bubbling so the panel's outer click-to-collapse handler doesn't
    // fire when interacting with the input.
    ['click','pointerdown','keydown'].forEach(ev =>
      input.addEventListener(ev, e => e.stopPropagation())
    );

    // Click the alphabet grid as a typeable keyboard. Encode mode types
    // the letter (output renders its glyph); decode mode types the glyph
    // (output renders the letter). Inserted at the caret position.
    const keyGrid = key.querySelector('.key-grid');
    keyGrid.addEventListener('pointerdown', e => e.stopPropagation());
    keyGrid.addEventListener('click', (e) => {
      e.stopPropagation();
      const cell = e.target.closest('.key-cell');
      if (!cell) return;
      const letter = cell.querySelector('.let').textContent;
      const glyph  = cell.querySelector('.sym').textContent;
      const ch = decoder.dataset.mode === 'encode' ? letter : glyph;
      const start = input.selectionStart ?? input.value.length;
      const end   = input.selectionEnd   ?? input.value.length;
      const v = input.value;
      input.value = v.slice(0, start) + ch + v.slice(end);
      const pos = start + ch.length;
      input.focus();
      try { input.setSelectionRange(pos, pos); } catch(_) {}
      renderOutput();
    });

    setTimeout(() => input.focus(), 50);
  }
  function collapse(){
    key.classList.remove('expanded'); key.classList.add('collapsed');
    key.innerHTML = '';
  }
  // The panel only expands from a collapsed click — once it's open the
  // only thing that collapses it is the × button. (Dead-space clicks
  // inside the expanded panel used to wipe in-progress text.)
  key.addEventListener('click', () => {
    if (key.classList.contains('collapsed')) expand();
  });
  key.addEventListener('keydown', e => {
    if (!key.classList.contains('collapsed')) return;
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); key.click(); }
  });
}

function setupCursorTrail(){
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let last = 0;
  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - last < 55) return;
    last = now;
    const t = document.createElement('span');
    t.className = 'trail';
    t.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const jx = (Math.random() - 0.5) * 14;
    const jy = (Math.random() - 0.5) * 14;
    t.style.left = (e.clientX + jx) + 'px';
    t.style.top  = (e.clientY + jy) + 'px';
    t.style.fontSize = (10 + Math.random() * 6) + 'px';
    // tint trail color based on which section we're over
    if (document.body.classList.contains('is-investigation')) t.style.color = '#f0e8d6';
    document.body.appendChild(t);
    const dx = (Math.random() - 0.5) * 30;
    const dy = -10 - Math.random() * 18;
    t.animate(
      [{ transform: 'translate(0,0)', opacity: 0.85 },
       { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }
    ).onfinish = () => t.remove();
  });
}

/* =========== §B  HELIX MORPH =========== */

/* ================================================================
   bridgeMorph() — single-system staff-to-helix morph.

   At t=0 the SVG renders a stylised bar of music:
     - a treble clef glyph on the left
     - five horizontal staff lines
     - a phrase of mixed notes (quarters, beamed pairs, beamed
       sixteenth-triples, lone flagged eighths) with real stem
       direction depending on each note's slot

   As t advances 0..1, the SAME staff lines bend along the demo's
   parametric interpolation toward a DNA double helix; the note heads
   ride the curve while stems / beams / flags / clef fade out before
   the helix forms, so the transition reads as a single notation
   gradually warping rather than two layered systems cross-fading.

   At t=1 the visible state is a clean gold + ink helix with optional
   ATGC base-pair rungs.

   Coordinates: viewBox 360 × 720, preserveAspectRatio xMidYMid meet.
   Centre of staff is at y = H/2 = 360.
   ================================================================ */
function bridgeMorph(opts){
  opts = opts || {};
  const SVGNS = 'http://www.w3.org/2000/svg';

  // ---- Geometry (viewBox units) ----
  const W = 360, H = 720;
  const CX = W / 2;
  const STAFF_CY = H / 2;          // staff vertical centre
  const STRANDS = 5;
  const STAFF_GAP = 26;            // distance between adjacent staff lines
  const HALF_GAP  = STAFF_GAP / 2; // distance between line and adjacent space (= one slot)
  const SAMPLES = opts.samples || 220; // strand resolution (mobile drops to ~100)
  const HELIX_AMP  = opts.helixAmp  || 64;  // helix half-width (viewBox px)
  const HELIX_FREQ = opts.helixFreq || 5.5; // full waves down the SVG
  const STEM_LEN  = 70;            // viewBox units — standard 3.5 × staff gap
  const STEM_W    = 3.6;           // thick, iconic — matched to the heavy reference style
  // Reference-style notes have ROUND, heavy filled heads roughly the size of a
  // staff space (gap = 26 ≈ diameter 24). We render as a circle (rx = ry) with
  // no tilt — the reference heads do not read as engraved-notation ovals.
  const HEAD_RX   = 12.0;
  const HEAD_RY   = 12.0;
  const HEAD_TILT = 0;

  const clefG   = document.getElementById('clef');
  const linesG  = document.getElementById('lines');
  const goldG   = document.getElementById('goldStrand');
  const rungsG  = document.getElementById('rungs');
  const beamsG  = document.getElementById('beams');
  const stemsG  = document.getElementById('stems');
  const notesG  = document.getElementById('notes');
  const flagsG  = document.getElementById('flags');

  // ---- The musical phrase. -----
  // `slot` is half-line offset from middle line. 0 = middle line.
  // Negative = above middle (higher pitch), positive = below.
  // The five staff lines sit at slots {-4, -2, 0, +2, +4}.
  // Slot ranges from -5 (just above top line) to +5 (just below bottom line);
  // we keep notes mostly within the staff for a melodic, on-staff feel.
  //
  // `kind`:  'q' = quarter (no flag/beam)
  //          'e' = lone eighth (gets a curved flag)
  //          'b0'/'b1' = beamed eighth pair (b0 is the leader; the next note
  //                       must be b1 and shares a single beam to b0)
  //          't0'/'t1'/'t2' = beamed sixteenth triple (t0 leader, t2 tail)
  //                       gets a double beam connecting all three stem tips
  //
  // x is centre of the note head in viewBox units (the bar spans x ≈ 76 → 344).
  const MUSIC_BAR = [
    // Evenly spaced across x=130..340 (≈26.25 unit gap, 9 notes, 8 gaps).
    // Bar starts past the treble clef (rendered ~x=14 → ~x=110 at font-size 200).
    { x: 130, slot:  2, kind: 'q'  },
    { x: 156, slot: -1, kind: 'b0' },
    { x: 183, slot:  1, kind: 'b1' },
    { x: 209, slot: -3, kind: 'q'  },
    { x: 236, slot:  0, kind: 'e'  },
    { x: 262, slot:  1, kind: 'b0' },
    { x: 288, slot:  2, kind: 'b1' },
    { x: 314, slot: -2, kind: 'q'  },
    { x: 340, slot: -4, kind: 'e'  }
  ];

  // Helper: y of a slot.
  function slotY(slot){ return STAFF_CY + slot * HALF_GAP; }

  // Beamed groups share a stem direction. We compute it once from the
  // mean slot of the group: mean <= 0 → stem DOWN; else stem UP.
  // For lone notes (no group), each note picks its own direction.
  (function annotateStemDirs(){
    const N = MUSIC_BAR.length;
    for (let i = 0; i < N; i++){
      const note = MUSIC_BAR[i];
      if (note.kind === 'b0' && i + 1 < N){
        const mean = (note.slot + MUSIC_BAR[i+1].slot) / 2;
        const down = mean <= 0;
        note._groupStemDown = down;
        MUSIC_BAR[i+1]._groupStemDown = down;
      } else if (note.kind === 't0' && i + 2 < N){
        const mean = (note.slot + MUSIC_BAR[i+1].slot + MUSIC_BAR[i+2].slot) / 3;
        const down = mean <= 0;
        note._groupStemDown = down;
        MUSIC_BAR[i+1]._groupStemDown = down;
        MUSIC_BAR[i+2]._groupStemDown = down;
      }
    }
    for (let i = 0; i < N; i++){
      const note = MUSIC_BAR[i];
      if (note._groupStemDown === undefined){
        note._groupStemDown = note.slot <= 0;
      }
    }
  })();

  // ---- Strand path (the demo's math, in new coords). ----
  function strandPath(k, t){
    // k=0..STRANDS-1. At t=0, strand k sits at y = STAFF_CY + (k-2)*STAFF_GAP.
    // Strand 0 = top staff line, strand 4 = bottom staff line.
    const staffY = STAFF_CY + (k - (STRANDS-1)/2) * STAFF_GAP;
    // Phases: strand 0 in phase, strand STRANDS-1 anti-phase.
    const helixPhase = (k === 0) ? 0
                     : (k === STRANDS-1 ? Math.PI
                     : (k * Math.PI / (STRANDS-1)));
    let d = '';
    for (let i = 0; i <= SAMPLES; i++){
      const u = i / SAMPLES;
      const y = u * H;
      const wave = Math.sin((y / H) * HELIX_FREQ * Math.PI * 2 + helixPhase);
      const helixX = CX + wave * HELIX_AMP;
      const x0 = u * W,     y0 = staffY;
      const x1 = helixX,    y1 = y;
      const x  = x0 + (x1 - x0) * t;
      const yy = y0 + (y1 - y0) * t;
      d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + yy.toFixed(2) + ' ';
    }
    return d;
  }

  // ---- Note head position at scroll t. -----
  // The head's t=0 position is its bar position (x, slotY); its t=1 position
  // rides one of the helix strands so it lands as a base-pair-like marker.
  // We assign each note to an alternating strand to avoid all heads piling
  // up on a single curve at t=1.
  function notePos(noteIndex, t){
    const note = MUSIC_BAR[noteIndex];
    const x0 = note.x;
    const y0 = slotY(note.slot);
    // For the helix end-position we use u = x0 / W as the parametric y so
    // notes spiral down in the same left-to-right reading order they had
    // on the staff. The strand alternates so notes hit both sides of the
    // helix.
    const u = (x0 - 30) / (W - 60); // normalise within the staff x-range
    const y1 = u * H;
    const phase = (noteIndex % 2 === 0) ? 0 : Math.PI;
    const wave = Math.sin((y1 / H) * HELIX_FREQ * Math.PI * 2 + phase);
    const x1 = CX + wave * HELIX_AMP;
    return {
      x: x0 + (x1 - x0) * t,
      y: y0 + (y1 - y0) * t
    };
  }

  // ---- Build static children ----

  // Treble clef: Unicode U+1D11E rendered via SVG <text>.
  // The font stack falls back through macOS Apple Symbols / Bravura / Noto Music.
  // We anchor the text so the clef's hairpin curl wraps the G-line (the
  // 4th staff line from top, slot=+2, y ≈ STAFF_CY + STAFF_GAP).
  const clefText = document.createElementNS(SVGNS, 'text');
  clefText.setAttribute('class', 'clef-glyph');
  // Unicode treble clef glyph.
  clefText.textContent = '𝄞';
  clefG.appendChild(clefText);

  // Strand paths (5)
  const strandPaths = [];
  for (let k = 0; k < STRANDS; k++){
    const p = document.createElementNS(SVGNS, 'path');
    linesG.appendChild(p);
    strandPaths.push(p);
  }
  // Gold complementary strand (mirrors the bottom strand)
  const goldPath = document.createElementNS(SVGNS, 'path');
  goldG.appendChild(goldPath);

  // Note primitives — one head, one stem, one flag per note;
  // beams are kept in a separate group, indexed per beam-leader note.
  const heads = [];
  const stems = [];
  const flags = [];
  const beams = [];
  for (let i = 0; i < MUSIC_BAR.length; i++){
    const head = document.createElementNS(SVGNS, 'ellipse');
    head.setAttribute('rx', HEAD_RX.toFixed(2));
    head.setAttribute('ry', HEAD_RY.toFixed(2));
    notesG.appendChild(head);
    heads.push(head);

    const stem = document.createElementNS(SVGNS, 'rect');
    stem.setAttribute('width', STEM_W.toFixed(2));
    stemsG.appendChild(stem);
    stems.push(stem);

    const flag = document.createElementNS(SVGNS, 'path');
    flagsG.appendChild(flag);
    flags.push(flag);

    const beam = document.createElementNS(SVGNS, 'path');
    beamsG.appendChild(beam);
    beams.push(beam);
  }

  // ATGC base letters (drawn but kept invisible until late in the morph,
  // optional — base-pair rungs are the main visual at t=1).
  const BASE_CHARS = ['A','T','G','C','A','C','G','T','C','G','A','T','G','A'];
  const BASE_COUNT = 14;
  const rungs = [];
  for (let i = 0; i < BASE_COUNT; i++){
    const ln = document.createElementNS(SVGNS, 'line');
    // Rungs are the helix end-state — per-rung geometry/depth/opacity/
    // stroke-width DON'T depend on t. Position them once at init so
    // render() doesn't redo 7 setAttribute × 14 rungs per scroll frame.
    const u = (i + 0.5) / BASE_COUNT;
    const y = u * H;
    const wave  = Math.sin((y / H) * HELIX_FREQ * Math.PI * 2 + 0);
    const wave2 = Math.sin((y / H) * HELIX_FREQ * Math.PI * 2 + Math.PI);
    const x1 = CX + wave  * HELIX_AMP;
    const x2 = CX + wave2 * HELIX_AMP;
    ln.setAttribute('x1', x1.toFixed(2));
    ln.setAttribute('y1', y.toFixed(2));
    ln.setAttribute('x2', x2.toFixed(2));
    ln.setAttribute('y2', y.toFixed(2));
    ln.setAttribute('stroke', 'currentColor');
    const sep   = Math.abs(x1 - x2);
    const norm  = sep / (HELIX_AMP * 2);
    const depth = 0.18 + 0.82 * norm;
    ln.setAttribute('opacity', depth.toFixed(3));
    ln.setAttribute('stroke-width', (0.7 + 0.7 * norm).toFixed(2));
    rungsG.appendChild(ln);
    rungs.push(ln);
  }

  // ---- Optional pre-bake (mobile + tablet) ----
  // Per-frame work is dominated by 5 strand path-d regenerations
  // (100-220 sin/cos + interp + string concat each) and 9 note-position
  // calcs. On mobile Safari this lands at 8-16 ms per scroll frame even
  // with rAF gating, which drops touch-scroll frames.
  // Pre-bake the strand strings + note positions at FRAMES discrete
  // t-steps; render() snaps to the nearest cached frame and idx-memoizes
  // (skips entirely if the snapped idx didn't change). Most scroll
  // events on a slow drag become no-ops, busy ones just write strings.
  const PREBAKE = !!opts.prebake;
  const FRAMES = 41; // 2.5% step — imperceptibly granular at typical scroll heights
  let frameCache = null;
  let lastFrameIdx = -1;
  function buildFrameCache(){
    const fc = new Array(FRAMES);
    for (let f = 0; f < FRAMES; f++){
      const t = f / (FRAMES - 1);
      const strands = new Array(STRANDS);
      for (let k = 0; k < STRANDS; k++) strands[k] = strandPath(k, t);
      const notes = new Array(MUSIC_BAR.length);
      for (let i = 0; i < MUSIC_BAR.length; i++) notes[i] = notePos(i, t);
      fc[f] = { strands, notes };
    }
    frameCache = fc;
  }
  if (PREBAKE){
    // Defer past first paint — at 5 × 41 × 100 samples that's ~20k
    // sin/cos at boot, we don't want to block TTI with it. render()
    // falls back to dynamic computation until the cache is ready.
    setTimeout(buildFrameCache, 0);
  }

  // ---- Render. Call render(t) with t ∈ [0, 1]. ----
  function render(t){
    const clampedT = Math.max(0, Math.min(1, t));

    // Pre-bake fast path: snap to nearest cached frame. Same idx since
    // last call → nothing to draw, return before any setAttribute
    // touches the SVG. Single biggest mobile win — most scroll events
    // on a slow drag land on the same idx and become free.
    let frame = null;
    if (PREBAKE && frameCache){
      const idx = Math.round(clampedT * (FRAMES - 1));
      if (idx === lastFrameIdx) return;
      lastFrameIdx = idx;
      frame = frameCache[idx];
    }

    // ---- Strands ----
    for (let k = 0; k < STRANDS; k++){
      const p = strandPaths[k];
      p.setAttribute('d', frame ? frame.strands[k] : strandPath(k, clampedT));
      let op;
      if (k === 0){
        // Front strand — stays full opacity throughout.
        op = 1;
      } else if (k === STRANDS - 1){
        // Back strand fades out 0.45 → 0.80 so the gold copy can take over.
        op = 1 - Math.min(1, Math.max(0, (clampedT - 0.45) / 0.35));
      } else {
        // Inner strands fade out as the staff bends; they have no helix counterpart.
        op = 1 - Math.min(1, clampedT * 1.6);
      }
      p.setAttribute('opacity', op.toFixed(3));
    }
    // Back-strand (#goldStrand kept for renderer compatibility — no
    // longer gold). Fades in 0.40 → 0.80 like before, BUT capped at
    // 0.55 max opacity so it visually recedes behind the front strand.
    // Same cream colour as the front strand; depth = thinner stroke
    // (1.8 vs front 2.6) + lower opacity.
    goldPath.setAttribute('d', frame ? frame.strands[STRANDS - 1] : strandPath(STRANDS - 1, clampedT));
    const backFadeIn = Math.max(0, Math.min(1, (clampedT - 0.40) / 0.40));
    const backOp = backFadeIn * 0.55;
    goldG.setAttribute('opacity', backOp.toFixed(3));

    // ---- Clef ----
    // Sits on the staff at t=0, slowly fades 0.0 → 0.40.
    // Anchored so its G-curl (which in Unicode glyphs lies roughly at the
    // glyph's baseline) wraps the G-line (slot +2). Apple Symbols and
    // Bravura render the glyph with the baseline near the descender's
    // bottom loop, so we place the baseline a touch below the staff.
    const clefX = 14;
    const clefY = STAFF_CY + 56;   // baseline below staff for visual fit
    clefText.setAttribute('x', clefX.toFixed(2));
    clefText.setAttribute('y', clefY.toFixed(2));
    const clefOp = 1 - Math.min(1, Math.max(0, clampedT / 0.40));
    clefG.setAttribute('opacity', clefOp.toFixed(3));

    // ---- Notes ----
    // Per-element opacity envelopes (decoration fades faster than heads):
    //   stems / beams / flags: 1 until t≈0.30, 0 by t≈0.55
    //   heads: 1 until t≈0.50, 0 by t≈0.85
    const decoOp = 1 - Math.min(1, Math.max(0, (clampedT - 0.30) / 0.25));
    const headOp = 1 - Math.min(1, Math.max(0, (clampedT - 0.50) / 0.35));
    stemsG.setAttribute('opacity', decoOp.toFixed(3));
    beamsG.setAttribute('opacity', decoOp.toFixed(3));
    flagsG.setAttribute('opacity', decoOp.toFixed(3));
    notesG.setAttribute('opacity', headOp.toFixed(3));

    // Cache head positions (needed for beam endpoints).
    const positions = frame ? frame.notes : MUSIC_BAR.map((_, i) => notePos(i, clampedT));

    // Stem geometry helper. Returns the head-attachment x and the stem-tip y
    // for a note at position p with the group-shared stem direction.
    function stemGeom(p, stemDown){
      // Round head: the stem joins flush with the head's side, slightly tucked
      // in so the stem reads as embedded in (not floating off) the head.
      const tiltRad = HEAD_TILT * Math.PI / 180;
      const HEAD_EDGE = Math.abs(HEAD_RX * Math.cos(tiltRad)) +
                        Math.abs(HEAD_RY * Math.sin(tiltRad)) - 1.5;
      const attachX = stemDown ? (p.x - HEAD_EDGE) : (p.x + HEAD_EDGE);
      const tipY    = stemDown ? (p.y + STEM_LEN) : (p.y - STEM_LEN);
      return { attachX, tipY };
    }

    for (let i = 0; i < MUSIC_BAR.length; i++){
      const note = MUSIC_BAR[i];
      const p = positions[i];
      const stemDown = note._groupStemDown;

      // Head — tilted ellipse.
      const head = heads[i];
      head.setAttribute('cx', p.x.toFixed(2));
      head.setAttribute('cy', p.y.toFixed(2));
      head.setAttribute('transform',
        `rotate(${HEAD_TILT} ${p.x.toFixed(2)} ${p.y.toFixed(2)})`);

      // Stem — rect from head edge toward stem-tip.
      const g = stemGeom(p, stemDown);
      const stemX = g.attachX - STEM_W / 2;
      const stemTopY = stemDown ? p.y : g.tipY;
      const stem = stems[i];
      stem.setAttribute('x', stemX.toFixed(2));
      stem.setAttribute('y', stemTopY.toFixed(2));
      stem.setAttribute('height', STEM_LEN.toFixed(2));
      stem.setAttribute('fill', 'currentColor');

      // Beam (beam-leader of an eighth pair).
      const beam = beams[i];
      beam.setAttribute('d', '');
      if (note.kind === 'b0' && i + 1 < MUSIC_BAR.length){
        const pn = positions[i + 1];
        const g1 = stemGeom(p,  stemDown);
        const g2 = stemGeom(pn, stemDown);
        const BT = 8.5; // beam thickness — heavy filled bar matching the reference style
        // Beam sits AWAY from the heads — for stem-up, beam extends below tip;
        // for stem-down, beam extends above tip. Either way, we draw a thick
        // parallelogram from one tip to the other; the sign accounts for the
        // direction the beam thickness should grow.
        const sign = stemDown ? -1 : 1;
        const y1 = g1.tipY, y2 = g2.tipY;
        beam.setAttribute('d',
          `M ${g1.attachX.toFixed(2)} ${y1.toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${y2.toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${(y2 + sign * BT).toFixed(2)} ` +
          `L ${g1.attachX.toFixed(2)} ${(y1 + sign * BT).toFixed(2)} Z`);
        beam.setAttribute('fill', 'currentColor');
      }
      // Sixteenth-triple double-beam: drawn on the leader (t0), spans
      // through t2's stem tip. Two parallel beams.
      if (note.kind === 't0' && i + 2 < MUSIC_BAR.length){
        const p2 = positions[i + 2];
        const g1 = stemGeom(p,  stemDown);
        const g2 = stemGeom(p2, stemDown);
        const BT  = 6.5;     // beam thickness — heavy bars matching reference style
        const BS  = 4.0;     // separation between the two beams
        const sign = stemDown ? -1 : 1;
        const y1 = g1.tipY, y2 = g2.tipY;
        // First beam at stem tips.
        const off2 = sign * (BT + BS);
        beam.setAttribute('d',
          // beam 1
          `M ${g1.attachX.toFixed(2)} ${y1.toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${y2.toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${(y2 + sign * BT).toFixed(2)} ` +
          `L ${g1.attachX.toFixed(2)} ${(y1 + sign * BT).toFixed(2)} Z ` +
          // beam 2 (offset inward toward heads)
          `M ${g1.attachX.toFixed(2)} ${(y1 + off2).toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${(y2 + off2).toFixed(2)} ` +
          `L ${g2.attachX.toFixed(2)} ${(y2 + off2 + sign * BT).toFixed(2)} ` +
          `L ${g1.attachX.toFixed(2)} ${(y1 + off2 + sign * BT).toFixed(2)} Z`);
        beam.setAttribute('fill', 'currentColor');
        beam.setAttribute('fill-rule', 'evenodd');
      }

      // Flag (lone eighths only). Reference-style "scimitar": starts at the
      // stem tip, sweeps OUT (right) and DOWN, then curls back UP and BACK
      // over the stem-tip area. Closed filled shape with a tapered tip at
      // both ends and a heavy belly mid-curve. Total span ~36 (~½ stem),
      // belly width ~12 (~head diameter).
      const flag = flags[i];
      flag.setAttribute('d', '');
      if (note.kind === 'e'){
        const gf = stemGeom(p, stemDown);
        const fx = gf.attachX;
        const fy = gf.tipY;
        // dir: stem-up tip is above the head → flag swoops DOWN toward head
        // (dir=+1). stem-down → flag swoops UP toward head (dir=-1).
        const dir = stemDown ? -1 : 1;
        // Geometry, in stem-local coords (origin = stem tip, +x = outward
        // from head along stem-side, +y = dir = down for stem-up):
        //
        //   START (stem tip): narrow point on the stem.
        //   OUTER SPINE: arcs out-and-away then drops, peaking at
        //     (+22, +20·dir) — the "elbow" of the scimitar.
        //   FAR TIP: (+10, +34·dir) — the curling-back tip, BACK toward
        //     the stem axis, a touch beyond the elbow vertically.
        //   INNER CURVE: returns up-and-in along the inside of the curl,
        //     back toward a point ~3px below origin on the stem.
        //
        // The result reads as a thick "comma" / "scimitar" silhouette
        // — out, down, curling back up-and-in over the stem tip.
        flag.setAttribute('d',
          // Pointed origin on the stem at the tip.
          `M ${fx.toFixed(2)} ${fy.toFixed(2)} ` +
          // Outer spine: out-and-down sweep to the elbow, then curling
          // BACK toward the stem axis to the far tip.
          `C ${(fx + 16).toFixed(2)} ${(fy + dir * 2).toFixed(2)}, ` +
          `${(fx + 26).toFixed(2)} ${(fy + dir * 10).toFixed(2)}, ` +
          `${(fx + 22).toFixed(2)} ${(fy + dir * 22).toFixed(2)} ` +
          // Continue the curl: out-elbow to far-tip, scooping back toward stem.
          `C ${(fx + 19).toFixed(2)} ${(fy + dir * 30).toFixed(2)}, ` +
          `${(fx + 13).toFixed(2)} ${(fy + dir * 34).toFixed(2)}, ` +
          `${(fx + 9).toFixed(2)} ${(fy + dir * 33).toFixed(2)} ` +
          // Crisp inner tip at the far end (the "point" of the comma).
          `L ${(fx + 8).toFixed(2)} ${(fy + dir * 31).toFixed(2)} ` +
          // Inner curve back: rides the inside of the curl, narrowing as it
          // returns toward the stem near the origin.
          `C ${(fx + 13).toFixed(2)} ${(fy + dir * 27).toFixed(2)}, ` +
          `${(fx + 18).toFixed(2)} ${(fy + dir * 20).toFixed(2)}, ` +
          `${(fx + 15).toFixed(2)} ${(fy + dir * 12).toFixed(2)} ` +
          // Inner spine continues back toward the stem at the origin.
          `C ${(fx + 12).toFixed(2)} ${(fy + dir * 7).toFixed(2)}, ` +
          `${(fx + 6).toFixed(2)} ${(fy + dir * 4).toFixed(2)}, ` +
          `${(fx + 0.5).toFixed(2)} ${(fy + dir * 3).toFixed(2)} ` +
          // Close back to the origin — pointed base on the stem.
          `Z`);
        flag.setAttribute('fill', 'currentColor');
      }
    }

    // ---- Rungs (helix end-state) ----
    // Fade in 0.65 → 0.95 so they don't appear mid-bend. At t=1 they
    // connect the two strands as base-pair markers. Each rung's PER-
    // RUNG opacity is now scaled by the horizontal separation between
    // the strands at that y — wide separation (front of the twist)
    // reads bold; narrow separation (where the strands cross at the
    // back) fades out. This gives the helix a believable rotational
    // depth without any 3D maths. All cream — no gold/warm-dark.
    // Per-rung geometry/depth/opacity/stroke-width were hoisted to
    // init — they're static (helix end-state). Only the group opacity
    // varies with t. Saves ~70 setAttribute calls per scroll frame.
    const rungOp = Math.max(0, Math.min(1, (clampedT - 0.65) / 0.30));
    rungsG.setAttribute('opacity', rungOp.toFixed(3));
  }

  return { render };
}

function setupHelixMorph(){
  // The morph was retired during Site Polish §4 (the transition desk
  // took its place) but has been brought back as its own dedicated
  // section (.music-morph), with the gold strand recoloured warm-dark
  // (#8a6f3a) so it sits inside the gold-budget rule. The renderer
  // hooks back up the moment #morph + #music-morph are in the DOM.
  const lane = document.getElementById('music-morph');
  if (!lane) return;
  const morphSvg = document.getElementById('morph');
  if (!morphSvg) return;

  // Mobile + tablet performance — two switches:
  //
  // 1. Sample count: 100 vs 220 strand-segment samples. At the 60vh
  //    display height the visual difference is imperceptible.
  // 2. Pre-bake: cache strand path strings + note positions at 41
  //    discrete t-steps. render() snaps to the nearest cached frame
  //    and idx-memoizes (skips entirely if the snapped index didn't
  //    change). Single biggest mobile Safari win — most scroll events
  //    on a slow drag land on the same idx and become free.
  //
  // Both kick in at ≤1180 px so iPad landscape gets them too. Desktop
  // CPUs handle the dynamic version without dropping frames; skipping
  // the cache there saves ~250 KB of cached path strings.
  const isSmall = window.matchMedia &&
                  window.matchMedia('(max-width: 1180px)').matches;
  const morph = bridgeMorph({
    samples: isSmall ? 100 : 220,
    prebake: isSmall,
  });

  function tintBridge(t){
    // The morph lives on dusk-teal end-to-end now, so the foreground
    // colour is constant cream (`--cloud-body`) regardless of t — no
    // need to interpolate from ink-on-teal at top to cream-on-walnut
    // at bottom, that legacy gradient is gone. Keeping the function so
    // future tinting (e.g. fading out at the seams) has a hook.
    lane.style.setProperty('--bridge-fg', 'var(--cloud-body)');
    lane.style.setProperty('--bridge-fg-mute', 'rgba(240,232,214,0.7)');
  }

  const reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let raf = false;
  function onScroll(){
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => {
      raf = false;
      // Single rect read per frame; gate the heavy render on visibility so
      // we don't burn cycles regenerating strand paths while the user is
      // miles away (in the hero, the desk, or the footer).
      const r = lane.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > 2 * vh) return;
      const total = lane.offsetHeight - vh;
      const sT = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
      morph.render(sT);
      tintBridge(sT);
    });
  }

  if (reducedMotion){
    // Render the bar of music at t=0 and don't animate.
    morph.render(0);
    tintBridge(0);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
}


/* =========== §C  ARIA AUDIO (YouTube IFrame Player + fallback) =========== */

let ytPlayer = null;
let ytReady  = false;
let ytFailed = false;             // set true if YT can't initialise (e.g. CSP-sandboxed preview)
let fallbackAudio = null;
const YT_VIDEO_ID = '15ezpwCHtJs';
const YT_START_S  = 1;
const YT_VOLUME   = 28;           // 0..100

// YouTube IFrame API calls this global when the script finishes loading.
window.onYouTubeIframeAPIReady = function(){
  try {
    ytPlayer = new YT.Player('ytPlayer', {
      width: 200, height: 120,
      videoId: YT_VIDEO_ID,
      playerVars: {
        start: YT_START_S, autoplay: 0, controls: 0,
        modestbranding: 1, playsinline: 1, rel: 0, iv_load_policy: 3
      },
      events: {
        onReady: () => {
          ytReady = true; ytFailed = false;
          try { ytPlayer.setVolume(YT_VOLUME); } catch(e) {}
        },
        onError: () => { ytFailed = true; },
        onStateChange: (e) => {
          const S = (window.YT && YT.PlayerState) || {};
          if (e.data === S.PLAYING)  setUiPlaying(true);
          if (e.data === S.PAUSED)   setUiPlaying(false);
          if (e.data === S.ENDED)    { try { ytPlayer.seekTo(YT_START_S); ytPlayer.playVideo(); } catch(_) {} }
        }
      }
    });
  } catch(err){ ytFailed = true; }
};

function setUiPlaying(on){
  const btn = document.getElementById('ariaBtn');
  const lbl = document.getElementById('ariaLabel');
  const canister = document.querySelector('.canister');
  const iconPlay  = document.querySelector('.canister .icon-play');
  const iconPause = document.querySelector('.canister .icon-pause');
  if (btn) {
    btn.classList.toggle('playing', on);
    btn.setAttribute('aria-pressed', String(on));
  }
  if (lbl) lbl.textContent = on ? 'Aria · on' : 'Aria · off';
  if (canister) canister.classList.toggle('playing', on);
  // Swap the visible icon: triangle ▶ when stopped, two bars ‖ when playing.
  if (iconPlay)  iconPlay.style.display  = on ? 'none' : '';
  if (iconPause) iconPause.style.display = on ? '' : 'none';
}

function ensureFallback(){
  if (fallbackAudio) return fallbackAudio;
  fallbackAudio = new Audio();
  // Public-domain Aria from Open Goldberg Variations (Kimiko Ishizaka, CC0).
  fallbackAudio.src = 'https://archive.org/download/OpenGoldbergVariations/Kimiko%20Ishizaka%20-%20J.S.%20Bach-%20-Open-%20Goldberg%20Variations%2C%20BWV%20988%20%28Piano%29%20-%2001%20Aria.mp3';
  fallbackAudio.loop = true;
  fallbackAudio.volume = 0.10;
  fallbackAudio.crossOrigin = 'anonymous';
  fallbackAudio.addEventListener('play',  () => setUiPlaying(true));
  fallbackAudio.addEventListener('pause', () => setUiPlaying(false));
  return fallbackAudio;
}

function ytAvailable(){
  return ytReady && !ytFailed && ytPlayer && typeof ytPlayer.playVideo === 'function';
}

function playMusic(){
  if (ytAvailable()){
    try { ytPlayer.unMute(); ytPlayer.setVolume(YT_VOLUME); ytPlayer.playVideo(); } catch(_) {}
    return;
  }
  // YouTube isn't ready / is blocked — use the archive.org Aria.
  const a = ensureFallback();
  const p = a.play();
  if (p && p.then) p.catch((err) => {
    console.warn('[GBV] audio fallback blocked:', err);
    const lbl = document.getElementById('ariaLabel');
    if (lbl) lbl.textContent = 'Aria · blocked';
    setUiPlaying(false);
  });
}
function pauseMusic(){
  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    try { ytPlayer.pauseVideo(); } catch(_) {}
  }
  if (fallbackAudio){ try { fallbackAudio.pause(); } catch(_) {} }
}
function isMusicPlaying(){
  if (ytAvailable()){
    try {
      const S = (window.YT && YT.PlayerState) || {};
      if (ytPlayer.getPlayerState() === S.PLAYING) return true;
    } catch(_) {}
  }
  return !!(fallbackAudio && !fallbackAudio.paused && !fallbackAudio.ended);
}

function setupAriaAudio(){
  const btn = document.getElementById('ariaBtn');
  const playInd = document.getElementById('playInd');
  let userToggled = false;     // set true once the user has explicitly used a play/pause control

  // Track our INTENT separately from the audio engine's reported state.
  // Earlier the toggle asked `isMusicPlaying()` to decide play vs pause —
  // but if the YT player state momentarily desynced (loading, buffering,
  // transient PAUSED→PLAYING transition), the toggle could read "not
  // playing" mid-click and call playMusic() again instead of pausing.
  // Tracking our own flag means the toggle ALWAYS flips regardless of
  // engine state, then we call the appropriate engine method.
  let intentPlaying = false;

  function toggle(e){
    if (e) { e.preventDefault(); e.stopPropagation(); }
    userToggled = true;        // explicit control — disable autoplay-on-gesture from here on
    intentPlaying = !intentPlaying;
    if (intentPlaying) { playMusic();  setUiPlaying(true); }
    else               { pauseMusic(); setUiPlaying(false); }
  }
  if (btn) btn.addEventListener('click', toggle);
  if (playInd) {
    // The canister's ▶ button mirrors the bridge audio toggle.
    playInd.addEventListener('pointerdown', (e) => e.stopPropagation());
    playInd.addEventListener('click', toggle);
  }

  // If the YouTube IFrame API never initialises (CSP block, sandboxed
  // preview, network), mark it failed so subsequent clicks immediately
  // use the archive.org Aria fallback.
  setTimeout(() => { if (!ytReady) ytFailed = true; }, 3500);

  // Autoplay-on-first-gesture. Browsers block straight autoplay until the
  // page has had a user interaction, but the moment any gesture happens —
  // a click anywhere, a scroll, a keystroke, a touch — that gesture
  // satisfies the policy and we can start the Aria. If the user has
  // already toggled the button explicitly we skip; their choice wins.
  const evs = ['click', 'keydown', 'scroll', 'touchstart', 'pointerdown'];
  let autoplayDone = false;
  const onFirstGesture = () => {
    if (autoplayDone || userToggled) return;
    autoplayDone = true;
    if (!isMusicPlaying()) {
      playMusic();
      intentPlaying = true;    // sync our intent flag with the autoplay
    }
    evs.forEach(ev => window.removeEventListener(ev, onFirstGesture, true));
  };
  evs.forEach(ev => window.addEventListener(ev, onFirstGesture, { passive: true, capture: true }));
}

/* =========== §D  DETECTIVE BOARD =========== */

function setupCards(){
  const board = document.getElementById('caseBoard');
  const hint = document.getElementById('hint');
  // Skip hidden artifacts (e.g. the polaroid microscope, which has been
  // removed visually but is still in the DOM during the v5 transition).
  // Otherwise keyboard tabbing lands on invisible cards.
  const artifacts = board.querySelectorAll('.artifact:not([hidden])');
  let zCounter = 10;
  const initial = new Map();

  function flipCard(a){
    const back = a.querySelector('.side.back');
    // Bring the card to the top of the z-stack as it flips so its
    // back face (or its newly revealed front, when un-flipping) reads
    // cleanly above any neighbouring cards that overlap it.
    a.style.zIndex = ++zCounter;
    a.classList.add('flipping');
    sfxRustle();
    setTimeout(() => {
      a.classList.toggle('flipped');
      if (back && a.classList.contains('flipped')){
        back.scrollTop = 0;
        // v7.3 — cipher decrypt animation removed from card flips.
        // The v6 backs are plain narrative copy ("In 1957, a young
        // molecular biologist arrives at a mid-western university…")
        // — the cipher → plaintext cascade was a legacy v1/v2
        // effect that read as glitchy noise on long story beats.
        // Back text now just fades in cleanly with the .flipped
        // class change.
      }
      a.classList.remove('flipping');
    }, 220);
  }

  artifacts.forEach(a => {
    a.style.zIndex = ++zCounter;
    initial.set(a, {
      left: a.style.left, right: a.style.right,
      top: a.style.top, transform: a.style.transform
    });

    // Punch-card flip restored in v6 — it now has its own story-line
    // back ("A quarter century later, a young couple…") so flipping
    // matters. The earlier focus-driven viewport scroll + back
    // overflow issues are fixed by the v5.9 mousedown-preventDefault
    // + v5.10 overflow-y: auto on .side.back.

    // Make each artifact keyboard-focusable + flippable with Enter / Space.
    a.setAttribute('tabindex', '0');
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', 'Artifact card — press Enter to flip');
    a.addEventListener('keydown', (e) => {
      if (e.target !== a) return;
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        flipCard(a);
      }
    });
    // Cards on the cork board are CLICK-TO-FLIP only — no drag, no
    // focus scroll. The drag-to-rearrange mechanic was retired in
    // v5.7. In v5.9 we ALSO intercept mousedown to preventDefault,
    // because the artifact's tabindex="0" was causing the browser to
    // focus the card and scroll it into view on click — visually
    // identical to the card "moving down" in the viewport. Keyboard
    // users can still tab to + focus the card, then flip via
    // Enter / Space (the keydown handler above).
    a.addEventListener('mousedown', (e) => {
      if (e.target.closest('input, button, .play-indicator')) return;
      e.preventDefault();
    });
    a.addEventListener('click', (e) => {
      if (e.target.closest('input, button, .play-indicator')) return;
      // v7.1 — bulletproof scroll lock. Mousedown preventDefault stops
      // focus-driven scroll-into-view, but some browsers still
      // auto-scroll after the click in certain ::target / overflow
      // contexts. Snapshot the page scroll position right before flip
      // and restore it on the next two frames if anything tried to
      // change it.
      const sx = window.scrollX, sy = window.scrollY;
      flipCard(a);
      a.blur();
      const lock = () => { if (window.scrollX !== sx || window.scrollY !== sy) window.scrollTo(sx, sy); };
      requestAnimationFrame(lock);
      requestAnimationFrame(() => requestAnimationFrame(lock));
    });
  });

  // Reset button removed with the drag mechanic (v5.7) — DOM node
  // gone, so guard the lookup. If a future iteration brings it back,
  // the existing close-the-flipped-state behaviour is preserved here
  // for re-attachment.
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      artifacts.forEach(a => {
        const init = initial.get(a);
        a.style.left = init.left;
        a.style.right = init.right;
        a.style.top = init.top;
        a.style.transform = init.transform;
        a.classList.remove('flipped');
      });
    });
  }
}

function setupBeetle(){
  const beetle = document.getElementById('beetle');
  if (!beetle) return;
  if (matchMedia('(pointer: coarse)').matches)            { beetle.style.display = 'none'; return; }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { beetle.style.display = 'none'; return; }

  /* Continuous physics-style motion. Each frame we advance position
     by `speed * dt` along `heading`, lerp the visual rotation toward
     the heading, and apply tiny noise so the path isn't sterile. */

  // Position (viewport coords — beetle is position:fixed)
  let x = Math.min(window.innerWidth  - 60, window.innerWidth  * 0.82);
  let y = Math.min(window.innerHeight - 100, window.innerHeight * 0.78);

  // Angles in radians; 0 = +x (right), -π/2 = up
  let heading       = -Math.PI / 2;
  let targetHeading = heading;
  let visualDeg     = -90;          // SVG is drawn head-up, so head-up = -90deg
  let speed         = 0;            // px / second, smoothed toward targetSpeed

  // Cursor tracking
  let mouseX = -9999, mouseY = -9999;
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  // State machine — 'walking' | 'pausing' | 'startled'
  let state = 'walking';
  let stateUntil = performance.now() + 3500;
  let nextTurnAt = performance.now() + 1800 + Math.random() * 2200;

  function setState(s, dur){
    state = s;
    stateUntil = performance.now() + dur;
  }
  function angleDelta(target, current){
    let d = target - current;
    while (d >  Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    return d;
  }
  function place(){
    beetle.style.left = x.toFixed(1) + 'px';
    beetle.style.top  = y.toFixed(1) + 'px';
    beetle.style.transform = 'rotate(' + visualDeg.toFixed(2) + 'deg)';
  }
  place();

  let rafId = 0;
  let lastT = performance.now();

  function tick(now){
    const dt = Math.min(0.05, (now - lastT) / 1000);   // clamp big gaps
    lastT = now;

    /* — State transitions — */
    if (now > stateUntil){
      if (state === 'walking'){
        // Roughly 30% of the time pause (antennae sensing); otherwise keep walking
        if (Math.random() < 0.30) setState('pausing',  700 + Math.random() * 1500);
        else                       setState('walking', 3500 + Math.random() * 4000);
      } else if (state === 'pausing'){
        setState('walking', 3500 + Math.random() * 4000);
        nextTurnAt = now + 600 + Math.random() * 1500;
      } else if (state === 'startled'){
        // Brief freeze after scurry, then resume
        setState('pausing', 250 + Math.random() * 400);
      }
    }

    /* — Cursor proximity → startle (only if cursor is genuinely close) — */
    const dxm = mouseX - x, dym = mouseY - y;
    const distM = Math.hypot(dxm, dym);
    if (distM < 75 && state !== 'startled' && mouseX > 0){
      targetHeading = Math.atan2(y - mouseY, x - mouseX);   // away from cursor
      setState('startled', 550 + Math.random() * 450);
      sfxScuttle();
    }

    /* — Occasional deliberate turn while walking — */
    if (state === 'walking' && now > nextTurnAt){
      const big = Math.random() < 0.10;
      const turn = (Math.random() - 0.5) * (big ? Math.PI : Math.PI / 3);
      targetHeading = heading + turn;
      nextTurnAt = now + 1800 + Math.random() * 2400;
    }

    /* — Edge avoidance: bias target heading back toward viewport interior — */
    const m = 70;
    if (x < m || x > window.innerWidth  - m ||
        y < m || y > window.innerHeight - m){
      const cx = window.innerWidth  * 0.5;
      const cy = window.innerHeight * 0.5;
      const toCenter = Math.atan2(cy - y, cx - x);
      targetHeading += angleDelta(toCenter, targetHeading) * 0.5;
    }

    /* — Smoothly turn toward target heading — */
    const turnRate = (state === 'startled') ? 6.0 : 2.2;   // rad/sec
    const ha = angleDelta(targetHeading, heading);
    heading += Math.sign(ha) * Math.min(Math.abs(ha), turnRate * dt);
    // Tiny natural wobble while walking
    if (state === 'walking') heading += (Math.random() - 0.5) * 0.45 * dt;

    /* — Speed by state, smoothed — */
    let targetSpeed;
    if      (state === 'walking')  targetSpeed = 50;       // ~50 px/s — beetle pace
    else if (state === 'pausing')  targetSpeed = 0;
    else                            targetSpeed = 230;     // scurry
    speed += (targetSpeed - speed) * Math.min(1, dt * 5);

    /* — Step forward — */
    x += Math.cos(heading) * speed * dt;
    y += Math.sin(heading) * speed * dt;
    x = Math.max(18, Math.min(window.innerWidth  - 18, x));
    y = Math.max(18, Math.min(window.innerHeight - 18, y));

    /* — Lerp the SVG rotation along shortest arc — */
    const targetVis = (heading * 180 / Math.PI) + 90;
    let vd = targetVis - visualDeg;
    while (vd >  180) vd -= 360;
    while (vd < -180) vd += 360;
    visualDeg += vd * Math.min(1, dt * 9);

    place();
    beetle.classList.toggle('scurrying', state === 'startled');
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame((t) => { lastT = t; tick(t); });

  // Pause the loop when the tab isn't visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){
      if (rafId){ cancelAnimationFrame(rafId); rafId = 0; }
    } else if (!rafId){
      lastT = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  });

  window.addEventListener('resize', () => {
    x = Math.min(x, window.innerWidth  - 30);
    y = Math.min(y, window.innerHeight - 30);
  });
}

function setupSignup(){
  const form = document.getElementById('signupForm');
  const env = document.getElementById('envelopeArt');
  if (!form) return;
  // Endpoint is a Google Apps Script Web App URL configured via
  // <meta name="signup-endpoint">. See MAILING_LIST.md for setup.
  const meta = document.querySelector('meta[name="signup-endpoint"]');
  const ENDPOINT = meta ? (meta.content || '').trim() : '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = document.getElementById('emailInput').value.trim();
    if (!v || !/^\S+@\S+\.\S+$/.test(v)) return;

    // Optimistic success — Apps Script web apps don't return CORS headers,
    // so we can't read the response anyway. Show the success state and
    // fire-and-forget the POST.
    env.classList.add('success');

    if (!ENDPOINT) return;   // not deployed yet — design-only success

    const fd = new FormData();
    fd.append('email', v);
    fd.append('source', location.href);
    fd.append('userAgent', navigator.userAgent);
    fetch(ENDPOINT, { method: 'POST', body: fd, mode: 'no-cors' })
      .catch(err => console.warn('[GBV] Signup POST failed:', err));
  });
}

/* =========== §E  Section observer (mode tinting) + boot =========== */

/* =========== Sound design — Web Audio synth (paper / chime / scuttle) ===========
   Lazy AudioContext, unlocked on the first user click. All effects are
   tiny and high-pass filtered so they sit under the visuals rather than
   announce themselves. Respects prefers-reduced-motion. */
let __sfxCtx = null;
const __sfxQuiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
function sfxCtx(){
  if (__sfxQuiet) return null;
  if (!__sfxCtx){
    try { __sfxCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(_) { return null; }
  }
  if (__sfxCtx.state === 'suspended'){
    try { __sfxCtx.resume(); } catch(_){}
  }
  return __sfxCtx;
}
function sfxChime(){
  const ctx = sfxCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1320, t);
  osc.frequency.exponentialRampToValueAtTime(880, t + 0.55);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.035, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.65);
}
function sfxRustle(){
  // A real paper rustle is many tiny crackles in fast succession, not one
  // long noise burst. Synthesize 3–5 short bandpass-filtered ticks 20–60 ms
  // apart so it reads as actual paper movement, then keep gain very low.
  const ctx = sfxCtx(); if (!ctx) return;
  const t0 = ctx.currentTime;
  const crackleCount = 3 + Math.floor(Math.random() * 3);
  for (let n = 0; n < crackleCount; n++){
    const start = t0 + n * (0.022 + Math.random() * 0.04);
    const dur = 0.018 + Math.random() * 0.028;
    const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++){
      const env = Math.pow(1 - i / data.length, 1.6);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200 + (Math.random() - 0.5) * 2000;
    bp.Q.value = 1.4;
    const gain = ctx.createGain();
    gain.gain.value = 0.012 + Math.random() * 0.008;
    src.connect(bp); bp.connect(gain); gain.connect(ctx.destination);
    src.start(start); src.stop(start + dur + 0.01);
  }
}
function sfxScuttle(){
  const ctx = sfxCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const dur = 0.06;
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++){
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
  }
  const src = ctx.createBufferSource(); src.buffer = buf;
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2400;
  const gain = ctx.createGain(); gain.gain.value = 0.025;
  src.connect(hp); hp.connect(gain); gain.connect(ctx.destination);
  src.start(t); src.stop(t + dur + 0.02);
}
function setupSoundFx(){
  // First click anywhere unlocks the AudioContext (autoplay policy).
  document.addEventListener('click', () => sfxCtx(), { once: true });
}

/* =========== Desk-surface ghost cipher (magnified-on-hover) =========== */
function setupDeskCipher(){
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const desk = document.getElementById('caseBoard');
  if (!desk) return;

  const layer = document.createElement('div');
  layer.className = 'desk-cipher';
  layer.setAttribute('aria-hidden', 'true');
  desk.insertBefore(layer, desk.firstChild);

  // Sprinkle ~70 ghost glyphs across the wood, sized 11–22 px and
  // randomly rotated. They live behind the cards (z-index: 1) so they
  // only appear in the gaps when the cursor is close.
  const COUNT = 70;
  const ghosts = [];
  for (let i = 0; i < COUNT; i++){
    const g = document.createElement('span');
    g.className = 'ghost-ch';
    g.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    g.style.left = (Math.random() * 100) + '%';
    g.style.top  = (Math.random() * 100) + '%';
    g.style.fontSize = (11 + Math.random() * 11).toFixed(1) + 'px';
    g.style.transform = `translate(-50%, -50%) rotate(${((Math.random()-0.5)*36).toFixed(1)}deg)`;
    layer.appendChild(g);
    ghosts.push(g);
  }

  let raf = 0, mx = -1e6, my = -1e6;
  const RADIUS = 170;
  function update(){
    raf = 0;
    const rect = desk.getBoundingClientRect();
    const lx = mx - rect.left;
    const ly = my - rect.top;
    ghosts.forEach(g => {
      const gx = g.offsetLeft;
      const gy = g.offsetTop;
      const dist = Math.hypot(lx - gx, ly - gy);
      const op = Math.max(0, Math.min(0.55, (RADIUS - dist) / RADIUS * 0.55));
      g.style.opacity = op.toFixed(3);
    });
  }
  desk.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  });
  desk.addEventListener('mouseleave', () => {
    mx = -1e6; my = -1e6;
    if (!raf) raf = requestAnimationFrame(update);
  });
}

/* =========== Beetle shower — fires when all 5 glyphs are found =========== */
function rainBeetles(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.beetle-rain')) return;  // don't double-fire

  const container = document.createElement('div');
  container.className = 'beetle-rain';
  container.setAttribute('aria-hidden', 'true');

  // Shared SVG defs — one gradient + symbol referenced by all the falling
  // beetles, so we don't ship 28 copies of the gradient definition.
  container.innerHTML = `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <radialGradient id="rainBeetleGold" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stop-color="#F5D060"/>
          <stop offset="40%" stop-color="#C9A227"/>
          <stop offset="100%" stop-color="#6B5210"/>
        </radialGradient>
        <symbol id="rainBeetleSym" viewBox="0 0 28 38">
          <g stroke="#2a1f10" stroke-width="1.2" fill="none" stroke-linecap="round">
            <path d="M 8 14 L 2 11"/>
            <path d="M 8 19 L 1 19"/>
            <path d="M 8 24 L 2 28"/>
            <path d="M 20 14 L 26 11"/>
            <path d="M 20 19 L 27 19"/>
            <path d="M 20 24 L 26 28"/>
          </g>
          <path d="M 11 5 Q 8 1 5 2" stroke="#2a1f10" stroke-width="1" fill="none"/>
          <path d="M 17 5 Q 20 1 23 2" stroke="#2a1f10" stroke-width="1" fill="none"/>
          <ellipse cx="14" cy="7" rx="5" ry="4" fill="#3a2e1c"/>
          <ellipse cx="14" cy="22" rx="8" ry="13" fill="url(#rainBeetleGold)" stroke="#6B5210" stroke-width="0.8"/>
          <line x1="14" y1="11" x2="14" y2="34" stroke="#2a1f10" stroke-width="0.7"/>
          <ellipse cx="11" cy="17" rx="2" ry="5" fill="#fff" opacity="0.25"/>
        </symbol>
      </defs>
    </svg>`;

  const COUNT = 32;
  const useTpl = '<svg viewBox="0 0 28 38"><use href="#rainBeetleSym"/></svg>';
  for (let i = 0; i < COUNT; i++){
    const b = document.createElement('div');
    b.className = 'rain-beetle';
    b.style.left = (Math.random() * 100) + '%';
    // Random rotation start + tumbling end (always ends ahead of start).
    const startRot = (Math.random() * 360 - 180);
    const tumble = 360 + Math.random() * 540;          // 360°..900° of spin
    const dir = Math.random() > 0.5 ? 1 : -1;
    b.style.setProperty('--rot-start', startRot + 'deg');
    b.style.setProperty('--rot-end',   (startRot + tumble * dir) + 'deg');
    b.style.setProperty('--drift', ((Math.random() - 0.5) * 140).toFixed(0) + 'px');
    b.style.setProperty('--scale', (0.7 + Math.random() * 0.7).toFixed(2));
    b.style.setProperty('--delay', (Math.random() * 1.6).toFixed(2) + 's');
    b.style.setProperty('--dur',   (3.2 + Math.random() * 2.4).toFixed(2) + 's');
    b.innerHTML = useTpl;
    container.appendChild(b);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 7500);
}

/* =========== Easter-egg ‡ glyph hunt =========== */
function setupEasterEggs(){
  // Five anchor selectors — one per "act" of the page. Each gets a small
  // gold ‡ injected at the end. Find all five → unlock the screenplay line.
  const ANCHORS = [
    '.hero .tagline em',
    '.notebook .nb-head',
    '.thematic-card.logline .hook-text',
    '.desk-head .marque',
    '.signup .envelope .eyebrow'
  ];
  const STORAGE = 'gbv-eggs-v2';
  let found;
  try { found = new Set(JSON.parse(localStorage.getItem(STORAGE) || '[]')); }
  catch(_) { found = new Set(); }

  const badge = document.getElementById('eggProgress');
  const count = document.getElementById('eggCount');
  const modal = document.getElementById('eggModal');
  const closeBtn = document.getElementById('eggClose');

  function refreshBadge(){
    if (!badge) return;
    if (count) count.textContent = found.size;
    badge.classList.toggle('visible', found.size > 0 && found.size < 5);
  }

  function showModal(){
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }
  function hideModal(){
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  ANCHORS.forEach((sel, i) => {
    const anchor = document.querySelector(sel);
    if (!anchor) return;
    const egg = document.createElement('button');
    egg.className = 'egg';
    egg.type = 'button';
    egg.dataset.egg = String(i + 1);
    egg.setAttribute('aria-label', `Hidden glyph ${i + 1} of 5`);
    egg.textContent = '‡';
    if (found.has(i)) egg.classList.add('found');
    egg.addEventListener('click', (e) => {
      e.stopPropagation();
      if (egg.classList.contains('found')) return;
      egg.classList.add('found');
      found.add(i);
      try { localStorage.setItem(STORAGE, JSON.stringify([...found])); } catch(_) {}
      refreshBadge();
      if (found.size === 5){
        setTimeout(rainBeetles, 600);
        setTimeout(showModal, 900);
      }
    });
    anchor.appendChild(egg);
  });

  if (modal){
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) hideModal();
  });
  refreshBadge();
}

function setupSectionObserver(){
  const investigation = document.getElementById('investigation');
  const hero = document.querySelector('header.hero');
  const musicMorph = document.getElementById('music-morph');
  const closing = document.getElementById('closing');
  const signup = document.getElementById('signup');
  const footer = document.querySelector('footer.masthead');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.target === investigation){
        document.body.classList.toggle('is-investigation', e.isIntersecting && e.intersectionRatio > 0.15);
      }
      if (e.target === hero){
        document.body.classList.toggle('is-hero', e.isIntersecting && e.intersectionRatio > 0.5);
      }
      if (e.target === musicMorph){
        // Hide the bridge audio button while the helix morph is on
        // screen — the morph IS the music visually, so an "AUDIO ON"
        // pill overlaid on it is redundant.
        document.body.classList.toggle('is-music-morph', e.isIntersecting && e.intersectionRatio > 0.15);
      }
      if (e.target === closing){
        // Closing-clouds section — drop the bridge audio pill so the
        // cloud-borne director / synopsis / milestones blocks read
        // cleanly. The Aria toggle on the desk's aria-snip card is
        // the local audio control through Movement II and III.
        document.body.classList.toggle('is-closing', e.isIntersecting && e.intersectionRatio > 0.15);
      }
      if (e.target === signup){
        document.body.classList.toggle('is-signup', e.isIntersecting && e.intersectionRatio > 0.15);
      }
      if (e.target === footer){
        // Hide as soon as the footer touches the viewport so the pill
        // never overlaps the © MMXXVI / Site No. legal line.
        document.body.classList.toggle('is-footer', e.isIntersecting && e.intersectionRatio > 0.05);
      }
    });
  }, { threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.6] });
  if (investigation) io.observe(investigation);
  if (hero)         io.observe(hero);
  if (musicMorph)   io.observe(musicMorph);
  if (closing)      io.observe(closing);
  if (signup)       io.observe(signup);
  if (footer)       io.observe(footer);
}

function setupHookReveal(){
  const hookText = document.getElementById('hookText');
  const lens = document.getElementById('hookLens');
  const stage = hookText && hookText.closest('.hook-stage');
  if (!hookText || !lens || !stage) return;

  // Build per-character spans grouped into per-word wrappers. Each word lives
  // inside <span class="word"> with white-space: nowrap, so line-wrapping
  // happens between words (never mid-word) even though characters are
  // independently inline-block for the lens-reveal math.
  const plain = hookText.getAttribute('data-plain') || '';
  const frag = document.createDocumentFragment();
  const charSpans = [];
  const words = plain.split(' ');
  for (let w = 0; w < words.length; w++){
    const word = words[w];
    if (word.length){
      const wrap = document.createElement('span');
      wrap.className = 'word';
      for (let i = 0; i < word.length; i++){
        const ch = word.charAt(i);
        const span = document.createElement('span');
        span.className = 'ch cipher';
        span.dataset.plain = ch;
        span.dataset.cipher = encChar(ch);
        span.textContent = span.dataset.cipher;
        wrap.appendChild(span);
        charSpans.push(span);
      }
      frag.appendChild(wrap);
    }
    if (w < words.length - 1) frag.appendChild(document.createTextNode(' '));
  }
  hookText.textContent = '';
  hookText.appendChild(frag);

  const LENS_RADIUS = 92;       // px — matches the SVG rim radius (viewBox unit == px)
  const REVEAL_RADIUS = 80;     // px — slightly inside the rim for a snug feel

  let raf = 0;
  let mouseX = 0, mouseY = 0;

  function update(){
    raf = 0;
    const stageRect = stage.getBoundingClientRect();
    const localX = mouseX - stageRect.left;
    const localY = mouseY - stageRect.top;

    lens.style.left = localX + 'px';
    lens.style.top  = localY + 'px';

    for (const span of charSpans){
      // Once revealed, stay revealed.
      if (span.classList.contains('revealed')) continue;
      const r = span.getBoundingClientRect();
      const cx = r.left + r.width  / 2 - stageRect.left;
      const cy = r.top  + r.height / 2 - stageRect.top;
      const dx = cx - localX, dy = cy - localY;
      const inside = (dx*dx + dy*dy) < (REVEAL_RADIUS * REVEAL_RADIUS);
      if (inside){
        span.className = 'ch revealed';
        span.textContent = span.dataset.plain;
      }
    }
  }

  function onMove(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  }

  function onEnter(){
    stage.classList.add('lens-active');
  }
  function onLeave(){
    stage.classList.remove('lens-active');
    // Revealed characters persist — leave them as-is.
  }

  stage.addEventListener('mousemove', onMove);
  stage.addEventListener('mouseenter', onEnter);
  stage.addEventListener('mouseleave', onLeave);

  // Touch / coarse-pointer / reduced-motion: auto-decrypt on scroll-into-view.
  const noHover = matchMedia('(hover: none)').matches ||
                  matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noHover){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        // Reveal characters left-to-right with a slight stagger.
        charSpans.forEach((span, i) => {
          setTimeout(() => {
            span.className = 'ch revealed';
            span.textContent = span.dataset.plain;
          }, 30 * i);
        });
        io.disconnect();
      });
    }, { threshold: 0.4 });
    io.observe(stage);
  }
}

// Cinematic atmosphere — parallax cloud drift.
/* Movement III · cloud-card arrival. Adds .cc-arrive to each cloud
   block when the closing section enters the viewport, staggered via
   transition-delays in CSS (--cc-tx-from carries the from-direction). */
function setupClosingClouds(){
  const closing = document.getElementById('closing');
  if (!closing) return;
  const cards = closing.querySelectorAll('.cloud-card');
  if (!cards.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){
    cards.forEach(c => c.classList.add('cc-arrive'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        cards.forEach(c => c.classList.add('cc-arrive'));
        io.disconnect();
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  io.observe(closing);
}

/* Sequential reveal for the transition-desk polaroids — adds .td-arrive
   to each card when the triptych enters the viewport, with staggered
   transition-delays in CSS handling the "in order of arrival" cadence. */
function setupPolaroidArrival(){
  const grid = document.querySelector('.td-polaroids');
  if (!grid) return;
  const polaroids = grid.querySelectorAll('.td-polaroid');
  if (!polaroids.length) return;
  // Reduced-motion: skip the animation, just mark all arrived.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){
    polaroids.forEach(p => p.classList.add('td-arrive'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        polaroids.forEach(p => p.classList.add('td-arrive'));
        io.disconnect();
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  io.observe(grid);
}

function setupParallax(){
  let raf = 0;
  function update(){
    raf = 0;
    document.documentElement.style.setProperty(
      '--scroll-y', window.scrollY + 'px'
    );
  }
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}

// ===== Mobile painterly-cloud tuner =====
// The site-wide .sky-clouds SVG renders 6 painterly filter chains
// (feTurbulence numOctaves=3 + feDisplacementMap scale=55–75 + feGaussianBlur
// stdDeviation=7–10) across ~30 cloud groups over a 1440×9000 viewBox spanning
// the entire page. Beautiful on desktop; mobile Safari pays a big GPU bill on
// the first paint. On small viewports we drop octaves 3→2 and halve both the
// displacement and blur — the painterly look survives, the cost roughly halves.
function tuneSkyForMobile(){
  if (!(window.matchMedia && window.matchMedia('(max-width: 820px)').matches)) return;
  for (let i = 1; i <= 6; i++){
    const f = document.getElementById('painterly-' + i);
    if (!f) continue;
    const turb = f.querySelector('feTurbulence');
    if (turb) turb.setAttribute('numOctaves', '2');
    const disp = f.querySelector('feDisplacementMap');
    if (disp){
      const s = parseFloat(disp.getAttribute('scale') || '50');
      disp.setAttribute('scale', String(Math.max(18, Math.round(s * 0.5))));
    }
    const blur = f.querySelector('feGaussianBlur');
    if (blur){
      const s = parseFloat(blur.getAttribute('stdDeviation') || '8');
      blur.setAttribute('stdDeviation', String(Math.max(3, Math.round(s * 0.55))));
    }
  }
}

function boot(){
  tuneSkyForMobile();
  initCipherTargets();
  setupDecryptObserver();
  buildFooterCipher();
  buildKey();
  setupCursorTrail();
  setupHelixMorph();
  setupAriaAudio();
  setupCards();
  setupBeetle();
  setupSignup();
  setupSectionObserver();
  setupEasterEggs();
  setupSoundFx();
  setupDeskCipher();
  setupHookReveal();
  setupPolaroidArrival();
  setupClosingClouds();
  setupParallax();
}
if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

}
