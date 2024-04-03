import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: "https://marianasilveira.vercel.app/",
  integrations: [tailwind(), solidJs(), db(), auth()],
  output: "server",
  adapter: vercel({
    imageService: true
  })
});