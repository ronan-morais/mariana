import { XataClient } from "../../xata";
import type { APIRoute } from "astro";


const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH
});


export const GET: APIRoute = async () => {

  let posts = await xata.db.contacts.getAll();

  if (!posts) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(
    JSON.stringify(posts), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}

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

  if (typeof name === 'string'
    && typeof email === 'string'
    && typeof phone === 'string'
    && typeof message === 'string') {

    await xata.db.contacts.create({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });

    return new Response(
      JSON.stringify("Enviado com sucesso! Por gentileza aguarde nosso contato."),
      { status: 200 }
    );
  }
}