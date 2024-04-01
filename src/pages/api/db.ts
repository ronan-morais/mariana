import type { APIRoute } from "astro";
import { db, Contacts } from 'astro:db';

export const GET: APIRoute = async () => {

  const contacts = await await db.select().from(Contacts);

  if (!contacts) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  const response = new Response(
    JSON.stringify(contacts), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response
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
      status: 400,
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
      await db.insert(Contacts).values({ name, email, phone, message });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Ocorreu um erro. Tente novamente." }), {
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