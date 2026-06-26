<section class="investigation" id="investigation">
  <div class="desk">

    <div class="desk-head">
      <div>
        <div class="marque">
          <b>Jan O'Deigh's Case File.</b>
        </div>
        <div class="hint" id="hint">click on any card to flip for more information</div>
      </div>
      <!-- Top-right typeset marque — mirrors the v3 detective desk
           label in the upper-right corner of the board. -->
      <div class="desk-tag" aria-hidden="true">
        <div class="tag-line"><span>JAN O'DEIGH</span> — PERSONAL DESK</div>
        <div class="tag-line accent">CASE : RESSLER, S.</div>
        <div class="tag-line muted">BROOKLYN PUBLIC LIBRARY</div>
      </div>
    </div>

    <div class="case-board" id="caseBoard">

      <!-- Red string SVG removed — on cork, the cards are pinned
           individually; no investigative thread is overlaid. The
           #redString id stays in the DOM as an empty placeholder so
           legacy JS that queries it remains a no-op without erroring. -->
      <svg class="red-string-svg" id="redString" width="0" height="0" aria-hidden="true" style="display:none"></svg>

      <!-- Roster in v6 (left → right): Notebook · Goldberg record ·
           Punch card · Library catalog. Leibniz quote + newspaper
           clipping removed per director feedback. -->

      <!-- 1 · Notebook — handwritten lab journal, S.R. · Aug. 1957 -->
      <div class="artifact notebook" data-art="notebook">
        <div class="face">
          <div class="side front">
            <div class="nb-head">Stuart Ressler lab notebook</div>
            <div class="nb-date">Aug. 1957</div>
            <p class="nb-line tilt">A — T &nbsp;·&nbsp; G — C</p>
            <p class="nb-mono">5'&nbsp;A T G C T A G G T C A A G&nbsp;3'</p>
            <p class="nb-mono faded">3'&nbsp;T A C G A T C C A G T T C&nbsp;5'</p>
            <p class="nb-line indent">codon &nbsp;<span class="nb-arrow">→</span>&nbsp; amino acid?</p>
            <p class="nb-line">if 4³ = 64, only 20 a.a.…</p>
            <p class="nb-line tilt indent italic">— the cipher must be <u>degenerate</u></p>
            <p class="nb-line">Goldberg playing again. Glenn G.</p>
            <p class="nb-line tilt italic">— 30 variations on one bass.</p>
          </div>
          <div class="side back">
            <p class="story">In 1957, a young molecular biologist arrives at a mid-western university determined to unravel the mystery of life — the code of the newly discovered DNA molecule.</p>
          </div>
        </div>
      </div>

      <!-- 2 · Goldberg Aria record — the v3 vinyl disc with a paper
           label. Click the play disc to start the Aria. -->
      <div class="artifact canister pin-red" data-art="canister">
        <div class="face">
          <div class="side front">
            <div class="ring"></div>
            <div class="label-strip">
              <div class="top">REEL · 01</div>
              <div class="mid">Aria<br>BWV 988</div>
              <div class="bot">— J.S. Bach —</div>
              <button class="play-indicator" id="playInd" aria-label="Play / pause Aria">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <polygon class="icon-play" points="7,4 21,12 7,20"></polygon>
                  <g class="icon-pause" style="display:none">
                    <rect x="6" y="4" width="5" height="16" rx="0.5"></rect>
                    <rect x="13" y="4" width="5" height="16" rx="0.5"></rect>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div class="side back">
            <p class="story">But he is derailed by the discovery of music and love.</p>
          </div>
        </div>
      </div>

      <!-- 3 · Mainframe punch card — 80-col Hollerith with visible
           punches. Restored to flip in v6 (the v5.11 no-flip lock is
           released; back-overflow is no longer an issue with the
           tightened body copy + 360 px card height). -->
      <div class="artifact punch-card" data-art="punch">
        <div class="face">
          <div class="side front">
            <div class="pc-corner"></div>
            <div class="pc-head">IBM · 5081 · 80-COL · 12-ROW</div>
            <div class="pc-grid" aria-hidden="true"></div>
            <div class="pc-foot">— Manhattan On-Line · graveyard shift · 1985 —</div>
          </div>
          <div class="side back">
            <p class="story">A quarter century later, a young couple team up to investigate a related mystery — who is the refined, over-educated gentleman who works as a graveyard shift computer operator in a dull Brooklyn data processing company?</p>
          </div>
        </div>
      </div>

      <!-- v7.4 — atmospheric Western Union telegram + Confidential
           envelope decorations removed. They kept colliding with the
           four story cards (notebook · canister · punch · catalog)
           on every layout pass. The director's v6 brief was four
           cards only; sticking to that means no overlaps. -->

      <!-- 5 · Sheet music — Aria opening (front), CAST sheet (back).
           Added in v7.5 per director feedback. Single staff system,
           treble + bass, six notes per bar, a "dolce" margin hint,
           a blue ink-stain in the upper right. -->
      <div class="artifact sheet" data-art="sheet">
        <div class="face">
          <div class="side front">
            <h4>Aria — from the Goldberg Variations, BWV 988</h4>
            <div class="composer">J. S. BACH · 1741</div>
            <div class="ink-stain"></div>
            <svg viewBox="0 0 300 150" style="width:100%;height:auto;display:block;" aria-hidden="true">
              <g stroke="#2A2520" stroke-width="0.7" fill="none">
                <!-- treble staff -->
                <line x1="10" y1="30" x2="290" y2="30"/>
                <line x1="10" y1="38" x2="290" y2="38"/>
                <line x1="10" y1="46" x2="290" y2="46"/>
                <line x1="10" y1="54" x2="290" y2="54"/>
                <line x1="10" y1="62" x2="290" y2="62"/>
                <!-- bass staff -->
                <line x1="10" y1="92"  x2="290" y2="92"/>
                <line x1="10" y1="100" x2="290" y2="100"/>
                <line x1="10" y1="108" x2="290" y2="108"/>
                <line x1="10" y1="116" x2="290" y2="116"/>
                <line x1="10" y1="124" x2="290" y2="124"/>
                <!-- bar lines -->
                <line x1="10"  y1="30" x2="10"  y2="124" stroke-width="1.5"/>
                <line x1="100" y1="30" x2="100" y2="124"/>
                <line x1="190" y1="30" x2="190" y2="124"/>
                <line x1="290" y1="30" x2="290" y2="124" stroke-width="1.5"/>
              </g>
              <!-- clefs -->
              <text x="14" y="58"  font-family="'Bravura Text','Apple Symbols','Noto Music','Segoe UI Symbol',serif" font-size="32" fill="#2A2520">&#x1D11E;</text>
              <text x="14" y="116" font-family="'Bravura Text','Apple Symbols','Noto Music','Segoe UI Symbol',serif" font-size="28" fill="#2A2520">&#x1D122;</text>
              <!-- time signature 3/4 -->
              <text x="38" y="48"  font-family="'EB Garamond',serif" font-size="14" fill="#2A2520" font-weight="700">3</text>
              <text x="38" y="62"  font-family="'EB Garamond',serif" font-size="14" fill="#2A2520" font-weight="700">4</text>
              <text x="38" y="108" font-family="'EB Garamond',serif" font-size="14" fill="#2A2520" font-weight="700">3</text>
              <text x="38" y="122" font-family="'EB Garamond',serif" font-size="14" fill="#2A2520" font-weight="700">4</text>
              <!-- treble notes -->
              <g fill="#2A2520" stroke="#2A2520" stroke-width="1">
                <ellipse cx="58"  cy="46" rx="4" ry="3" transform="rotate(-20 58 46)"/>
                <line x1="62"  y1="46" x2="62"  y2="22"/>
                <ellipse cx="78"  cy="42" rx="4" ry="3" transform="rotate(-20 78 42)"/>
                <line x1="82"  y1="42" x2="82"  y2="20"/>
                <ellipse cx="120" cy="50" rx="4" ry="3" transform="rotate(-20 120 50)"/>
                <line x1="124" y1="50" x2="124" y2="26"/>
                <ellipse cx="142" cy="46" rx="4" ry="3" transform="rotate(-20 142 46)"/>
                <line x1="146" y1="46" x2="146" y2="22"/>
                <ellipse cx="164" cy="50" rx="4" ry="3" transform="rotate(-20 164 50)"/>
                <line x1="168" y1="50" x2="168" y2="26"/>
                <ellipse cx="210" cy="42" rx="4" ry="3" transform="rotate(-20 210 42)"/>
                <line x1="214" y1="42" x2="214" y2="20"/>
                <ellipse cx="232" cy="46" rx="4" ry="3" transform="rotate(-20 232 46)"/>
                <line x1="236" y1="46" x2="236" y2="22"/>
                <ellipse cx="254" cy="50" rx="4" ry="3" transform="rotate(-20 254 50)"/>
                <line x1="258" y1="50" x2="258" y2="26"/>
              </g>
              <!-- bass notes -->
              <g fill="#2A2520" stroke="#2A2520" stroke-width="1">
                <ellipse cx="58"  cy="116" rx="4" ry="3" transform="rotate(-20 58 116)"/>
                <line x1="54"  y1="116" x2="54"  y2="138"/>
                <ellipse cx="120" cy="112" rx="4" ry="3" transform="rotate(-20 120 112)"/>
                <line x1="116" y1="112" x2="116" y2="134"/>
                <ellipse cx="210" cy="108" rx="4" ry="3" transform="rotate(-20 210 108)"/>
                <line x1="206" y1="108" x2="206" y2="130"/>
              </g>
              <!-- handwritten "dolce" margin note -->
              <text x="60" y="18" font-family="'Caveat',cursive" font-size="13" fill="#1F3A5F" font-style="italic">dolce</text>
            </svg>
          </div>
          <div class="side back">
            <h4>CAST — CONFIDENTIAL</h4>
            <div class="cast-row">
              <div><span class="cast-role">Stuart Ressler (1957)</span><em>casting in progress</em></div>
              <div><span class="cast-role">Stuart Ressler (1985)</span><em>casting in progress</em></div>
              <div><span class="cast-role">Jan O'Deigh</span><em>casting in progress</em></div>
              <div><span class="cast-role">Franklin Todd</span><em>casting in progress</em></div>
              <div><span class="cast-role">Dr. Jeanette Koss</span><em>casting in progress</em></div>
            </div>
            <div class="ann">ANNOUNCEMENTS — FALL 2026</div>
          </div>
        </div>
      </div>

      <!-- 4 · Library catalog card — The Gold Bug Variations · Powers · 1991 -->
      <div class="artifact catalog" data-art="catalog">
        <div class="face">
          <div class="side front">
            <div class="cat-num">813.54&nbsp;&nbsp;·&nbsp;&nbsp;P.O.WERS, R.</div>
            <h4>POWERS, RICHARD · b. 1957</h4>
            <p class="cat-body"><em>The Gold Bug Variations</em> : a novel / by Richard Powers. — New York : William Morrow, 1991. — 639 p. ; 24 cm.</p>
            <p class="cat-body" style="font-size:17px;font-weight:500;margin-top:10px;line-height:1.5;">Time Magazine "Book of the Year" · National Book Critics Circle Award · "A formidable masterpiece" — Kirkus.</p>
            <div class="cat-stamp">PROPERTY · BPL</div>
          </div>
          <div class="side back">
            <p class="story">Four interconnected characters — like the four molecules of DNA, and the four bass notes of Bach's Goldberg Variations — twist around each other in mirrored patterns as they try to decipher the complex codes of biology, of music, and of love.</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom-corner desk labels removed in v7.6 per director
         feedback (FOLLOW THE BEETLE + RESET DESK). The beetle still
         scurries; the reset button never had a function in this
         build (cards don't move on flip). -->
  </div>

  <!-- Beetle anchored to investigation but positioned fixed -->
  <div class="beetle" id="beetle" aria-hidden="true">
    <svg viewBox="0 0 28 38" width="28" height="38">
      <defs>
        <radialGradient id="bg" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stop-color="#F5D060"/><stop offset="40%" stop-color="#C9A227"/><stop offset="100%" stop-color="#6B5210"/>
        </radialGradient>
      </defs>
      <g stroke="#2a1f10" stroke-width="1.2" fill="none" stroke-linecap="round">
        <path d="M 8 14 L 2 11"/><path d="M 8 19 L 1 19"/><path d="M 8 24 L 2 28"/>
        <path d="M 20 14 L 26 11"/><path d="M 20 19 L 27 19"/><path d="M 20 24 L 26 28"/>
      </g>
      <path d="M 11 5 Q 8 1 5 2" stroke="#2a1f10" stroke-width="1" fill="none"/>
      <path d="M 17 5 Q 20 1 23 2" stroke="#2a1f10" stroke-width="1" fill="none"/>
      <ellipse cx="14" cy="7" rx="5" ry="4" fill="#3a2e1c"/>
      <ellipse cx="14" cy="22" rx="8" ry="13" fill="url(#bg)" stroke="#6B5210" stroke-width="0.8"/>
      <line x1="14" y1="11" x2="14" y2="34" stroke="#2a1f10" stroke-width="0.7"/>
      <ellipse cx="11" cy="17" rx="2" ry="5" fill="#fff" opacity="0.25"/>
    </svg>
  </div>
</section>


<!-- ============================================================
     §5b  CLOSING CLOUDS — Movement III · return to the sky
     The cork board fades out at the top; a small DNA-to-score-to-clouds
     transition lives in the .close-transition strip; three cloud
     blocks (director's background, milestones, synopsis) drift in
     left-to-right and settle. Bookends the hero's cloud-borne text.
     ============================================================ -->
