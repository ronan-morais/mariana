import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {

  const data = await request.formData();
  const nome = data.get("nome");
  const email = data.get("email");
  const telefone = data.get("telefone");
  const mensagem = data.get("mensagem");

  if (!nome || !email || !telefone || !mensagem) {
    return new Response(
      JSON.stringify({
        message: "Campo obrigatório",
      }),
      { status: 400 }
    )
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  
  async function sendEmail() {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      //from: nome + '<' + email + '>',
      to: ['ronan86@gmail.com'],
      subject: 'Mensagem de ' + nome,
      html: '<strong>' + mensagem + '</strong>',
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  };
  sendEmail()

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  )
}
