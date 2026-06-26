<section class="music-morph" id="music-morph" aria-label="A music staff bending into a DNA double helix">
  <div class="mm-stage">
    <!-- Bach / Watson-Crick caption removed per director feedback —
         the scroll-driven morph carries the metaphor on its own and we
         go right to the "Connected by …" line on the next section. -->
    <div class="mm-svg-wrap">
      <svg id="morph" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <!-- Back-to-front z-order: rungs (behind strands), back strand,
             front strand, beams/stems/heads/flags/clef.
             Both helix strands are cream (currentColor); depth comes from
             stroke-width + opacity differential. The back-strand group
             (#goldStrand — name kept for renderer compatibility) is
             rendered thinner and at lower opacity so it visually recedes. -->
        <g id="rungs"      stroke="currentColor" stroke-width="1.2" fill="none"
                           stroke-linecap="round" opacity="0"></g>
        <g id="goldStrand" stroke="currentColor" stroke-width="1.8" fill="none"
                           stroke-linecap="round" stroke-linejoin="round" opacity="0"></g>
        <g id="lines"      stroke="currentColor" stroke-width="2.6" fill="none"
                           stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="beams"      fill="currentColor"></g>
        <g id="stems"      fill="currentColor"></g>
        <g id="notes"      fill="currentColor"></g>
        <g id="flags"      fill="currentColor"></g>
        <g id="clef"></g>
      </svg>
    </div>
  </div>
</section>


<!-- ============================================================
     §3  AFTER-TRANSITION CARDS — the second voice arrives, and the
     logline that connects the two strands. The lens reveal lives on
     the second card.
     ============================================================ -->
