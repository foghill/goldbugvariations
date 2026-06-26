<section class="thematic" id="thematic" aria-label="Two intertwined love stories and the mystery that joins them">
  <div class="thematic-stage">

    <!-- The "And · Two — Intertwined love stories" card moved to the
         transition desk above (Polaroid C). This section now carries only
         the "Connected by —" logline + magnifying glass reveal. -->

    <article class="thematic-card logline">
      <!-- Eyebrow removed per director feedback — the body line stands
           on its own. -->
      <div class="hook-stage">
        <p class="hook-text" id="hookText" data-plain="Connected by the mystery of the disappearance of a brilliant scientist who was on the brink of discovering the code for life."></p>
        <div class="hook-lens" id="hookLens" aria-hidden="true">
      <svg viewBox="0 0 280 280" width="280" height="280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Convex glass: mostly transparent with a soft top-left brightness
               so the cursor's text underneath remains readable. -->
          <radialGradient id="lensGlass" cx="36%" cy="28%" r="72%">
            <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.42"/>
            <stop offset="28%"  stop-color="#ffffff" stop-opacity="0.10"/>
            <stop offset="62%"  stop-color="#ffffff" stop-opacity="0.02"/>
            <stop offset="100%" stop-color="#3c2814" stop-opacity="0.10"/>
          </radialGradient>

          <!-- Brass rim: multi-stop gradient simulating a curved metal band,
               with a bright top-left highlight rolling into a dark bottom-right. -->
          <linearGradient id="rimBrass" x1="0.15" y1="0.10" x2="0.85" y2="0.92">
            <stop offset="0%"   stop-color="#fbe6a3"/>
            <stop offset="18%"  stop-color="#e8c668"/>
            <stop offset="42%"  stop-color="#b8902b"/>
            <stop offset="68%"  stop-color="#7a5c14"/>
            <stop offset="100%" stop-color="#3a2a0a"/>
          </linearGradient>

          <!-- Ferrule brass: similar palette but oriented along the handle axis. -->
          <linearGradient id="ferruleBrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#f3d97a"/>
            <stop offset="22%"  stop-color="#d6ad44"/>
            <stop offset="55%"  stop-color="#9a7520"/>
            <stop offset="100%" stop-color="#4a360c"/>
          </linearGradient>

          <!-- Walnut handle: dark wood with a soft top highlight. -->
          <linearGradient id="handleWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#8a5e35"/>
            <stop offset="35%"  stop-color="#553620"/>
            <stop offset="75%"  stop-color="#2d1c0e"/>
            <stop offset="100%" stop-color="#150a04"/>
          </linearGradient>

          <!-- A faint ring glow used to seat the rim into the page. -->
          <radialGradient id="rimInnerShade" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stop-color="#000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0.22"/>
          </radialGradient>
        </defs>

        <!-- HANDLE: drawn first so subsequent layers cover its top end.
             Rotated -45° (counter-clockwise in SVG's down-positive y) so the
             handle emerges from the rim's lower-RIGHT — a right-handed grip. -->
        <g transform="rotate(-45 100 100)">
          <!-- Body of the handle -->
          <rect x="92" y="188" width="16" height="86" rx="7" ry="7"
                fill="url(#handleWood)"/>
          <!-- Top highlight strip — narrow band along the upper edge -->
          <rect x="93.5" y="190" width="3" height="82" rx="1.5"
                fill="#b58658" opacity="0.45"/>
          <!-- Subtle wood-grain accents -->
          <line x1="100" y1="194" x2="100" y2="270"
                stroke="#3a2412" stroke-width="0.6" opacity="0.5"/>
          <line x1="103" y1="198" x2="103" y2="265"
                stroke="#1c0e06" stroke-width="0.5" opacity="0.55"/>
          <!-- Bottom shadow strip -->
          <rect x="104" y="190" width="3" height="82" rx="1.5"
                fill="#0c0602" opacity="0.55"/>
          <!-- End cap shading -->
          <ellipse cx="100" cy="273" rx="7" ry="2"
                   fill="#0a0502" opacity="0.55"/>
        </g>

        <!-- FERRULE: the brass collar that joins handle to rim. Drawn AFTER
             the handle so it hides the handle's upper seam, and BEFORE the
             rim so the rim's lower-right arc covers its top edge. Rotated
             -45° to match the handle's right-handed orientation. -->
        <g transform="rotate(-45 100 100)">
          <!-- Main collar block -->
          <rect x="84" y="178" width="32" height="22" rx="3" ry="3"
                fill="url(#ferruleBrass)"
                stroke="#2c1f06" stroke-width="0.6"/>
          <!-- Top highlight band (bright brass) -->
          <rect x="85" y="179" width="30" height="3" rx="1.5"
                fill="#fde9a8" opacity="0.7"/>
          <!-- Mid-band groove (dark line) -->
          <rect x="84" y="188" width="32" height="1.4"
                fill="#1f1505" opacity="0.7"/>
          <!-- Lower groove highlight -->
          <rect x="84" y="189.4" width="32" height="0.8"
                fill="#fbe09a" opacity="0.45"/>
          <!-- Bottom shadow band -->
          <rect x="85" y="196.5" width="30" height="2" rx="1"
                fill="#1a1204" opacity="0.65"/>
          <!-- Tiny rivet on the upper collar -->
          <circle cx="100" cy="184.5" r="1.6" fill="#7a5a14"/>
          <circle cx="99.5" cy="184" r="0.7" fill="#fde9a8" opacity="0.85"/>
        </g>

        <!-- RIM: thick brass ring. Drawn last so its lower-right arc
             overlaps and covers the top edge of the ferrule, creating
             a continuous joint between the three pieces. -->
        <!-- Outer faint shadow halo (sits behind everything visually
             but rendered here so it doesn't darken the text underneath). -->
        <circle cx="100" cy="100" r="98"
                fill="none"
                stroke="#000" stroke-width="1"
                opacity="0.25"/>
        <!-- Main brass ring -->
        <circle cx="100" cy="100" r="92"
                fill="url(#lensGlass)"
                stroke="url(#rimBrass)" stroke-width="12"/>
        <!-- Inner dark hairline — separates rim from glass -->
        <circle cx="100" cy="100" r="86.2"
                fill="none"
                stroke="#241808" stroke-width="1"
                opacity="0.75"/>
        <!-- Inner bright hairline — bevel highlight inside the rim -->
        <circle cx="100" cy="100" r="87.4"
                fill="none"
                stroke="#fde9a8" stroke-width="0.6"
                opacity="0.55"/>
        <!-- Outer dark hairline — defines the rim against the page -->
        <circle cx="100" cy="100" r="98"
                fill="none"
                stroke="#1a1204" stroke-width="0.8"
                opacity="0.85"/>
        <!-- Specular arc — bright crescent on the upper-left of the rim -->
        <circle cx="100" cy="100" r="97.2"
                fill="none"
                stroke="#fff5d0" stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="58 600"
                stroke-dashoffset="-150"
                opacity="0.55"/>
        <!-- Inner-glass vignette — faint darkening at the lens edge for depth -->
        <circle cx="100" cy="100" r="86"
                fill="url(#rimInnerShade)"
                opacity="0.55"/>
        <!-- Glass highlight — bright crescent at top-left of the lens -->
        <ellipse cx="74" cy="72" rx="24" ry="13"
                 fill="#ffffff" opacity="0.35"
                 transform="rotate(-32 74 72)"/>
        <!-- Tiny secondary sparkle -->
        <ellipse cx="62" cy="86" rx="6" ry="3"
                 fill="#ffffff" opacity="0.30"
                 transform="rotate(-32 62 86)"/>
      </svg>
    </div>
  </div>
    </article>

  </div>
</section>


<!-- ============================================================
     §5  DETECTIVE BOARD — the case-file desk
     ============================================================ -->
