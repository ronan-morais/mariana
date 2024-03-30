import type { APIRoute } from "astro";
import { db, Contatos } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {

  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("phone");
  const message = data.get("message");

  if (!name || !email || !phone || !message) {
    return new Response(
      JSON.stringify({
        message: "Campo obrigatório",
      }),
      { status: 400 }
    )
  }

  async function sendEmail() {
    if (typeof name === 'string'
      && typeof email === 'string'
      && typeof phone === 'string'
      && typeof message === 'string') {
      // insert form data into the Comment table
      await db.insert(Contatos).values({ name, email, phone, message });
    }
  };

  sendEmail()

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  )
}
