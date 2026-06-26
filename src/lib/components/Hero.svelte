<header class="hero">

  <!-- Layer 3: cream-tinted film grain over the sky + clouds. -->
  <svg class="grain" aria-hidden="true">
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="1.3"
                    numOctaves="2" seed="11" stitchTiles="stitch"/>
      <feColorMatrix values="
        0 0 0 0 0.95
        0 0 0 0 0.90
        0 0 0 0 0.78
        0 0 0 0.7 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)"/>
  </svg>

  <div class="topbar">
    <div class="doc"><span>FOLIO 01 / IV</span></div>
  </div>

  <div class="hero-zone">
    <h1 class="title">The Gold Bug Variations</h1>
    <p class="tagline">A Feature Film Based on the Acclaimed Novel by <em>Richard Powers</em></p>
    <p class="credit">Directed by the Award-Winning Director Mark A. Levinson</p>
  </div>

  <div class="scroll-cue" aria-hidden="true">
    <span class="arrow">↓</span>
  </div>
</header>


<!-- §1b · SIMPLE PAIR removed — the Music · Four / Life · Four / And · Two
     beats are now carried by the transition desk's polaroid triptych below. -->


<!-- ============================================================
     §2  TRANSITION DESK — sky → dusk-teal handoff carrying the
     "Music · Four / Life · Four / And · Two" triptych across the seam.
     The id="bridge" wrapper is preserved so legacy hooks (egg anchor on
     .bridge-caption .cap-body, audio button bridge-aria, and the
     setupHelixMorph early-return guard) keep working.
     ============================================================ -->
