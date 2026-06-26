<script>
  import { onMount } from 'svelte';
  import { initSite } from '$lib/site.js';

  import SkyClouds from '$lib/components/SkyClouds.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Bridge from '$lib/components/Bridge.svelte';
  import MusicMorph from '$lib/components/MusicMorph.svelte';
  import Thematic from '$lib/components/Thematic.svelte';
  import Investigation from '$lib/components/Investigation.svelte';
  import Closing from '$lib/components/Closing.svelte';
  import Signup from '$lib/components/Signup.svelte';
  import Masthead from '$lib/components/Masthead.svelte';

  onMount(() => {
    // Run the ported behaviour (cipher, helix morph, cork board, …) now
    // that the DOM is mounted in the browser. initSite() also installs the
    // window.onYouTubeIframeAPIReady global, so load the IFrame API *after*.
    initSite();

    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      document.head.appendChild(s);
    }
  });
</script>

<!-- Cinematic atmosphere — purely decorative, pointer-events: none. -->
<div class="film-grain" aria-hidden="true"></div>

<a class="skip-link" href="#bridge">Skip to film</a>

<SkyClouds />
<Hero />
<Bridge />
<MusicMorph />
<Thematic />
<Investigation />
<Closing />
<Signup />
<Masthead />

<!-- Floating cipher key (collapsible) -->
<div class="cipher-key collapsed" id="cipherKey" role="button" aria-label="Open cipher key" tabindex="0"></div>

<!-- Easter-egg progress badge + unlock modal -->
<div class="egg-progress" id="eggProgress" aria-hidden="true">Glyphs · <span id="eggCount">0</span>/5</div>
<div class="egg-modal" id="eggModal" aria-hidden="true">
  <div class="panel" role="dialog" aria-modal="true" aria-labelledby="eggLabel">
    <button class="close" aria-label="Close" id="eggClose">×</button>
    <div class="label" id="eggLabel">Five glyphs · one message</div>
    <blockquote>Every code is a love letter waiting for someone patient enough to read it.</blockquote>
    <cite>— from the screenplay</cite>
  </div>
</div>

<!-- Hidden YouTube IFrame player (the actual music source — controlled by the
     bridge "Aria" button and the film-canister play indicator). -->
<div id="ytWrap" aria-hidden="true" style="position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;">
  <div id="ytPlayer"></div>
</div>
