<section class="bridge transition-desk" id="bridge" aria-label="Three theme cards: four bass notes, four base molecules, two intertwined love stories">

  <!-- The "§ 02 · the threefold theme · laid out on the desk, in order
       of arrival" header was design-doc shorthand and read as literal
       copy on the live site — removed. Cards arrive on their own. -->

  <!-- Three polaroids — the triptych. Each tilted, slight overlap. -->
  <div class="td-polaroids">

    <!-- Polaroid A · MUSIC · FOUR — bass clef + Goldberg ground bass tetrachord (G F# E D)
         Reference rebuild: real Unicode bass clef glyph (U+1D122 = 𝄢, with music-font
         fallback stack), 5-line staff with hand-drawn shiver, 4 stem-down quarter notes
         descending diagonally, letter labels below each note. -->
    <figure class="td-polaroid td-pa">
      <div class="td-photo td-photo-music" aria-hidden="true">
        <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="td-music-shiver" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="t"/>
              <feDisplacementMap in="SourceGraphic" in2="t" scale="0.7"/>
            </filter>
          </defs>

          <!-- Staff + clef + notes — all run through the shiver filter for hand-drawn feel -->
          <g filter="url(#td-music-shiver)" stroke="#1f1a16" stroke-linecap="round">
            <!-- 5-line staff -->
            <g stroke-width="1.05" fill="none">
              <line x1="32"  y1="100" x2="218" y2="100"/>
              <line x1="32"  y1="118" x2="218" y2="118"/>
              <line x1="32"  y1="136" x2="218" y2="136"/>
              <line x1="32"  y1="154" x2="218" y2="154"/>
              <line x1="32"  y1="172" x2="218" y2="172"/>
              <!-- right-edge bar -->
              <line x1="218" y1="100" x2="218" y2="172" stroke-width="1.4"/>
            </g>

            <!-- Bass clef — Unicode 𝄢 (U+1D122). Apple Symbols / Bravura render this as
                 a real F-clef glyph; older systems fall back through the music-font stack. -->
            <text x="32" y="158"
                  font-family="'Bravura Text', 'Apple Symbols', 'Noto Music', 'Segoe UI Symbol', 'STIX Two Math', 'Cambria Math', serif"
                  font-size="64"
                  fill="#1f1a16"
                  dominant-baseline="alphabetic"
                  text-anchor="start">&#x1D122;</text>

            <!-- 4 quarter notes — Goldberg ground bass tetrachord G F♯ E D, descending.
                 Each note one staff-step lower than the last; all four sit above middle
                 line, so stems point DOWN per standard notation. -->
            <g fill="#1f1a16">
              <ellipse cx="120" cy="127" rx="7.2" ry="5.2" transform="rotate(-22 120 127)"/>
              <ellipse cx="148" cy="136" rx="7.2" ry="5.2" transform="rotate(-22 148 136)"/>
              <ellipse cx="176" cy="145" rx="7.2" ry="5.2" transform="rotate(-22 176 145)"/>
              <ellipse cx="204" cy="154" rx="7.2" ry="5.2" transform="rotate(-22 204 154)"/>
            </g>
            <!-- Stems — descend from the right edge of each note-head ~50px down -->
            <g stroke="#1f1a16" stroke-width="1.6" fill="none">
              <line x1="126" y1="127" x2="126" y2="186"/>
              <line x1="154" y1="136" x2="154" y2="195"/>
              <line x1="182" y1="145" x2="182" y2="204"/>
              <line x1="210" y1="154" x2="210" y2="213"/>
            </g>
          </g>

          <!-- Letter labels below each note (OUTSIDE the shiver filter so the
               type stays crisp). EB Garamond serif, no italic. -->
          <g fill="#1f1a16"
             font-family="'EB Garamond', Georgia, serif"
             font-size="14"
             font-weight="500"
             text-anchor="middle"
             letter-spacing="0.02em">
            <text x="120" y="232">G</text>
            <text x="148" y="232">F♯</text>
            <text x="176" y="232">E</text>
            <text x="204" y="232">D</text>
          </g>
        </svg>
        <span class="td-photo-sub">— Aria · BWV 988 —</span>
      </div>
      <figcaption class="td-cap">
        <span class="td-cap-num">MUSIC</span>
        <span class="td-cap-sub">Four Bass Notes</span>
      </figcaption>
    </figure>

    <!-- Polaroid B · LIFE · FOUR — painterly cream+ink VERTICAL double helix on lined notebook paper, ATGC tick labels along the left rail -->
    <figure class="td-polaroid td-pb">
      <div class="td-photo td-photo-helix" aria-hidden="true">
        <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="helix-shiver" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="22" result="t"/>
              <feDisplacementMap in="SourceGraphic" in2="t" scale="3"/>
              <feGaussianBlur stdDeviation="0.45"/>
            </filter>
            <pattern id="td-notebook" patternUnits="userSpaceOnUse" width="240" height="22">
              <rect width="240" height="22" fill="#ede4cd"/>
              <line x1="0" y1="21" x2="240" y2="21" stroke="#b3c3c9" stroke-width="0.7" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="240" height="300" fill="url(#td-notebook)"/>
          <g filter="url(#helix-shiver)" stroke-linecap="round" fill="none">
            <!-- Two intertwined sine strands, vertical orientation. Centred at x=120, amplitude 38, 4 full periods top-to-bottom. -->
            <!-- Strand A — warm dark/brass -->
            <path d="M 120 24 C 158 38, 158 66, 120 80 C 82 94, 82 122, 120 136 C 158 150, 158 178, 120 192 C 82 206, 82 234, 120 248"
                  stroke="#8a6f3a" stroke-width="2.4"/>
            <!-- Strand B — ink, opposite phase -->
            <path d="M 120 24 C 82 38, 82 66, 120 80 C 158 94, 158 122, 120 136 C 82 150, 82 178, 120 192 C 158 206, 158 234, 120 248"
                  stroke="#1f1a16" stroke-width="2.4"/>
            <!-- Rungs at the crossings (horizontal lines connecting the strands at maximum width) -->
            <g stroke="#1f1a16" stroke-width="0.9" opacity="0.55">
              <line x1="92" y1="52" x2="148" y2="52"/>
              <line x1="92" y1="108" x2="148" y2="108"/>
              <line x1="92" y1="164" x2="148" y2="164"/>
              <line x1="92" y1="220" x2="148" y2="220"/>
            </g>
          </g>
          <!-- ATGC tick letters along the LEFT rail, aligned with the rungs -->
          <g fill="#1f1a16" font-family="'Special Elite', 'Courier Prime', ui-monospace, Menlo, monospace" font-size="13" text-anchor="start">
            <text x="40" y="56">A</text>
            <text x="40" y="112">T</text>
            <text x="40" y="168">G</text>
            <text x="40" y="224">C</text>
          </g>
        </svg>
        <span class="td-photo-sub">A · T · G · C</span>
      </div>
      <figcaption class="td-cap">
        <span class="td-cap-num">BIOLOGY</span>
        <span class="td-cap-sub">Four Base Molecules</span>
      </figcaption>
    </figure>

    <!-- Polaroid C · LIFE — interlocked ⚤ symbol on lined notebook paper.
         The single hand-drawn glyph (Mars + Venus locked through their
         centres) replaces the v5 four-hearts-on-a-spiral. One mark
         mirrors the "two" in the headline and reads at small sizes. -->
    <figure class="td-polaroid td-pc">
      <div class="td-photo td-photo-loop" aria-hidden="true">
        <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="loop-shiver" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="13" result="t"/>
              <feDisplacementMap in="SourceGraphic" in2="t" scale="3"/>
              <feGaussianBlur stdDeviation="0.45"/>
            </filter>
            <pattern id="td-notebook-c" patternUnits="userSpaceOnUse" width="240" height="22">
              <rect width="240" height="22" fill="#ede4cd"/>
              <line x1="0" y1="21" x2="240" y2="21" stroke="#b3c3c9" stroke-width="0.7" opacity="0.55"/>
            </pattern>
          </defs>

          <rect width="240" height="300" fill="url(#td-notebook-c)"/>

          <!-- Hand-drawn interlocked ⚤ glyph. Two rings stacked vertically
               (Mars top, Venus bottom) joined through their centres;
               each ring carries its own arrow / cross extending out so
               the symbol reads at a glance even with the shiver. -->
          <g filter="url(#loop-shiver)" stroke-linecap="round" stroke-linejoin="round"
             fill="none" stroke-width="3.2">

            <!-- ♂  Mars — upper ring, arrow to the upper-right -->
            <g stroke="#1f1a16">
              <circle cx="120" cy="116" r="38"/>
              <!-- arrow shaft from upper-right of ring (angle ~ -45°) -->
              <line x1="148" y1="88" x2="184" y2="52"/>
              <!-- arrowhead — two short strokes -->
              <line x1="184" y1="52" x2="184" y2="74"/>
              <line x1="184" y1="52" x2="162" y2="52"/>
            </g>

            <!-- ♀  Venus — lower ring, cross hanging below.
                 Drawn in a slightly warmer ink so the two glyphs read as
                 distinct but in conversation. -->
            <g stroke="#7a4a18">
              <circle cx="120" cy="184" r="38"/>
              <!-- cross — vertical stroke + horizontal bar -->
              <line x1="120" y1="222" x2="120" y2="262"/>
              <line x1="100" y1="244" x2="140" y2="244"/>
            </g>

            <!-- Highlight the locked junction with a small dotted glyph
                 where the rings meet — a single dot per ring's edge so
                 the eye reads them as fused. -->
            <g stroke="none" fill="#1f1a16">
              <circle cx="120" cy="150" r="2.2"/>
            </g>
          </g>

        </svg>
        <span class="td-photo-sub">♂ ⚯ ♀</span>
      </div>
      <figcaption class="td-cap">
        <span class="td-cap-num">LIFE</span>
        <span class="td-cap-sub">Two Intertwined Love Stories</span>
      </figcaption>
    </figure>

  </div>

  <!-- Bach blurb removed per director feedback: the triptych speaks for
       itself; the "Connected by …" line on the next section carries the
       mystery hook. The third easter-egg ‡ anchor moves to the
       music-morph caption (see ANCHORS in §egg). -->

  <!-- Floating bridge-aria audio pill removed in v5.6 — the canister's
       play button on the case file board is the only audio control
       now. setupAriaAudio() guards its lookups for #ariaBtn and
       #ariaLabel with `if (el)` checks, so removing the markup is a
       no-op on the script side. -->
</section>


<!-- ============================================================
     §2b  MUSIC → DNA HELIX MORPH (restored, recoloured)
     A scroll-driven SVG that begins as a stylised bar of music (treble
     clef + 5 staff lines + a phrase of mixed notes) and bends into a
     DNA double helix as the user scrolls. Carried by the bridgeMorph()
     renderer; same primitives at every t — no cross-fade. Recoloured
     ink + warm-dark (no gold per the gold-budget rule).
     ============================================================ -->
