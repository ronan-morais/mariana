import type { APIRoute } from "astro";
import { Resend } from "resend"

const resend = new Resend(import.meta.env.RESEND_API);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("phone");
  const message = data.get("message")

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 403 });
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: 'Fill all required fields' }), { status: 400 });
  }

  try {
    const req = await resend.emails.send({
      from: 'Mariana Silveira Castro  <admin@ccaltd.com.au>',
      to: 'ronan86@gmail.com',
      subject: `Nova mensagem de ${name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("req", req)
    return new Response(JSON.stringify({ message: 'Message sent successfully! We will contact you as soon as possible.' }), { status: 200 });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return new Response(JSON.stringify({ message: 'There was an error sending your message. Please try again later.' }), { status: 500 });
  }
}
