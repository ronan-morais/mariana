import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.marianacastropsicologa.com.br/",
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel(),
});