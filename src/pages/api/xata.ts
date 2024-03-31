import { XataClient } from "../../xata";
import type { APIRoute } from "astro";


const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH
});


export const GET: APIRoute = async () => {

  let contacts = await xata.db.contacts.getAll();

  if (!contacts) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(
    JSON.stringify(contacts), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export const POST: APIRoute = async ({ request }) => {

  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("phone");
  const message = data.get("message");

  if (!name || !email || !phone || !message) {
    return new Response(
      JSON.stringify({ message: "Campos obrigatórios não preenchidos" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  if (typeof name === 'string'
    && typeof email === 'string'
    && typeof phone === 'string'
    && typeof message === 'string') {

    try {
      await xata.db.contacts.create({
        name: name,
        email: email,
        phone: phone,
        message: message,
      });
    } catch (error) {
      return new Response(error.message, {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    return new Response(
      JSON.stringify({ message: "Mensagem enviada com sucesso. Em breve entraremos em contato." }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}