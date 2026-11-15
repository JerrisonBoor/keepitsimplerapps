// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://keepitsimpler.app',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/beta-access'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
