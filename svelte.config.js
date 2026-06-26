import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // The whole site is static; prerender it so the SEO / JSON-LD
    // markup ships as real HTML (matching the old static deploy).
    adapter: adapter(),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
