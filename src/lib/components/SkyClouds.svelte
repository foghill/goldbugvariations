<!-- ============================================================
     §1  HERO — Postcard-Noon: painterly-cloud SVG behind black stencil
     ============================================================ -->
<!-- ============================================================
     SITE-WIDE PAINTERLY CLOUDS — covers the entire body, not just
     the hero. Same exact filter chain (feTurbulence + feDisplacementMap
     + feGaussianBlur) used for the original hero clouds. ~24 cloud
     groups distributed top-to-bottom across viewBox 1440 × 9000. The
     top + bottom bands are bright fluffy clouds (matches what's at the
     top of the page); the middle band is muted (the body gradient is
     darkest there). One continuous sky.
     ============================================================ -->
<svg class="sky-clouds" viewBox="0 0 1440 9000"
     preserveAspectRatio="none" aria-hidden="true">
  <defs>
    <filter id="painterly-1" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="3"  result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="60"/>
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="painterly-2" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="11" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="55"/>
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="painterly-3" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="7"  result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="65"/>
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="painterly-4" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="21" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="75"/>
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <filter id="painterly-5" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="33" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="62"/>
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="painterly-6" x="-50%" y="-200%" width="200%" height="500%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="3" seed="47" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="70"/>
      <feGaussianBlur stdDeviation="9"/>
    </filter>
  </defs>

  <!-- ===== TOP BAND (y 0–1500) — Postcard Noon spec exact match.
       Per-cloud shadow + highlight cream variants from
       postcard-noon/design.md, not the simplified single-cream. ===== -->
  <g filter="url(#painterly-1)" opacity="0.90">
    <ellipse cx="220"   cy="334.4" rx="266"   ry="44"   fill="#a8bcc3"/>
    <ellipse cx="236.8" cy="313.6" rx="257.6" ry="46.4" fill="#f0e8d6"/>
    <ellipse cx="276"   cy="296"   rx="140"   ry="20.8" fill="#f0e8d6" opacity="0.6"/>
  </g>
  <g filter="url(#painterly-2)" opacity="0.85">
    <ellipse cx="1180"  cy="272.6" rx="228"   ry="38.5" fill="#a8bcc3"/>
    <ellipse cx="1194.4" cy="254.4" rx="220.8" ry="40.6" fill="#eee5d0"/>
    <ellipse cx="1228"  cy="239"   rx="120"   ry="18.2" fill="#eee5d0" opacity="0.6"/>
  </g>
  <g filter="url(#painterly-3)" opacity="0.95">
    <ellipse cx="760"   cy="554.4" rx="304"   ry="44"   fill="#aabec4"/>
    <ellipse cx="779.2" cy="533.6" rx="294.4" ry="46.4" fill="#f0e8d6"/>
    <ellipse cx="824"   cy="516"   rx="160"   ry="20.8" fill="#f0e8d6" opacity="0.6"/>
  </g>
  <g filter="url(#painterly-4)" opacity="0.70">
    <ellipse cx="380"   cy="732.6" rx="342"   ry="38.5" fill="#aabec4"/>
    <ellipse cx="401.6" cy="714.4" rx="331.2" ry="40.6" fill="#ece4cd"/>
    <ellipse cx="452"   cy="699"   rx="180"   ry="18.2" fill="#ece4cd" opacity="0.6"/>
  </g>

  <!-- Mid-top band (y 1500–3000) — Cream-only clouds (no shadow ellipse).
       The shadow underbelly that gives hero clouds depth was reading
       grey-dingy here, so dropped. Each cloud is now a single cream
       ellipse + small top cap, painted bright through the shiver
       filter. -->
  <g filter="url(#painterly-5)" opacity="0.65">
    <ellipse cx="296"   cy="1600" rx="306"   ry="44"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-6)" opacity="0.60">
    <ellipse cx="1116"  cy="1860" rx="278"   ry="42"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-1)" opacity="0.55">
    <ellipse cx="660"   cy="2180" rx="324"   ry="46"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-2)" opacity="0.45">
    <ellipse cx="236"   cy="2502" rx="248"   ry="40"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-3)" opacity="0.45">
    <ellipse cx="1196"  cy="2742" rx="258"   ry="42"   fill="#f0e8d6"/>
  </g>

  <!-- Mid band (y 3000–4500) — Cream-only, fading. -->
  <g filter="url(#painterly-4)" opacity="0.35">
    <ellipse cx="556"   cy="3142" rx="306"   ry="44"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-5)" opacity="0.30">
    <ellipse cx="1096"  cy="3442" rx="266"   ry="40"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-6)" opacity="0.28">
    <ellipse cx="336"   cy="3742" rx="288"   ry="44"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-1)" opacity="0.25">
    <ellipse cx="916"   cy="4062" rx="248"   ry="40"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-2)" opacity="0.22">
    <ellipse cx="436"   cy="4384" rx="230"   ry="38"   fill="#f0e8d6"/>
  </g>

  <!-- Dark middle band (y 4500–5500) — empty sky. The case-file desk
       sits here; clouds were reading dingy-grey behind the artifact
       cards, so removed entirely. The body gradient at this y is at
       its deepest sky-bottom; the artifact cards provide the visual
       rhythm without competing cloud puffs. -->

  <!-- Returning to light (y 5500–7000) — Cream-only, brightening. -->
  <g filter="url(#painterly-6)" opacity="0.30">
    <ellipse cx="796"   cy="5642" rx="268"   ry="42"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-1)" opacity="0.40">
    <ellipse cx="256"   cy="5962" rx="288"   ry="42"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-2)" opacity="0.50">
    <ellipse cx="1156"  cy="6282" rx="268"   ry="42"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-3)" opacity="0.60">
    <ellipse cx="560"   cy="6600" rx="306"   ry="46"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-4)" opacity="0.72">
    <ellipse cx="1116"  cy="6920" rx="288"   ry="44"   fill="#f0e8d6"/>
  </g>

  <!-- BOTTOM BAND (y 7000–9000) — bright cream-only clouds, no
       shadow ellipse (which read grey-dingy in the user's screenshots). -->
  <g filter="url(#painterly-5)" opacity="0.80">
    <ellipse cx="340"   cy="7260" rx="306"   ry="46"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-6)" opacity="0.85">
    <ellipse cx="1156"  cy="7580" rx="268"   ry="44"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-1)" opacity="0.80">
    <ellipse cx="720"   cy="7900" rx="324"   ry="46"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-2)" opacity="0.85">
    <ellipse cx="256"   cy="8220" rx="288"   ry="44"   fill="#f0e8d6"/>
  </g>
  <g filter="url(#painterly-3)" opacity="0.88">
    <ellipse cx="1120"  cy="8560" rx="306"   ry="46"   fill="#f0e8d6"/>
  </g>
</svg>


