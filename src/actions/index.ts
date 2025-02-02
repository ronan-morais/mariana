import { ActionError, defineAction } from 'astro:actions';
import { z } from "zod";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API);

export const server = {
  send: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      message: z.string(),
    }),
    handler: async (input) => {

      const { name, email, phone, message } = input;
      const { data, error } = await resend.emails.send({
        from: "Mariana Silveira de Castro <onboarding@resend.dev>",
        to: ['ronan86@gmail.com','psi.marianasc@gmail.com'],
        replyTo: `${name} <${email}>`,
        subject: 'Contato pelo site',
        html: `<div><b>Nome:</b> ${name}</div>
                <div><b>Telefone:</b> ${phone}</div>
                <div><b>E-mail:</b> ${email}</div>
                <div><b>Mensagem:</b> ${message}</div>`
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
};
