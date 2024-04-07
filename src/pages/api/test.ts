import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {

  const body = JSON.stringify({
    now: Date.now(),
  });
  return new Response(body);
}