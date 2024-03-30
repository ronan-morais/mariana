import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
//import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  site: "https://marianasilveira.vercel.app/",
  integrations: [tailwind(), solidJs(), db()],
  output: "hybrid",
  adapter: vercel()
} //integrations: [tailwind()]
);