import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves project sites beneath /<repository>/.
  // Local development and hosts using the domain root keep the default '/'.
  base: process.env.VITE_BASE_PATH || '/',
});
