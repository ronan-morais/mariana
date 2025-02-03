import { ActionError, defineAction } from 'astro:actions';
import { z } from "zod";
import { supabase } from "../lib/supabase";
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
        to: ['ronan86@gmail.com', 'psi.marianasc@gmail.com'],
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
  updateSobre: defineAction({
    accept: 'form',
    input: z.object({
      sobre_titulo: z.string().nullable(),
      sobre_conteudo: z.string().nullable(),
    }),
    handler: async (input) => {

      const { sobre_titulo, sobre_conteudo } = input;

      const { data, error } = await supabase
        .from('cms')
        .update({
          sobre_titulo: sobre_titulo,
          sobre_conteudo: sobre_conteudo
        })
        .eq('id', 1)
        .select()

      return data
    },
  }),
  updateServicos: defineAction({
    accept: 'form',
    input: z.object({
      servicos_titulo: z.string().nullable(),
      servicos_conteudo: z.string().nullable(),
      servicos_lista: z.string().nullable(),
    }),
    handler: async (input) => {

      const { servicos_titulo, servicos_conteudo, servicos_lista } = input;

      const { data, error } = await supabase
        .from('cms')
        .update({ sobre_titulo: servicos_titulo })
        .eq('id', 1)
        .select()

      return data
    },
  }),
  updateContato: defineAction({
    accept: 'form',
    input: z.object({
      sobre_titulo: z.string().nullable(),
      sobre_conteudo: z.string().nullable(),
      /*servicos_titulo: z.string().nullable(),
      servicos_conteudo: z.string().nullable(),
      servicos_lista: z.string().nullable(),
      contato_wpp: z.string().nullable(),
      contato_email: z.string().nullable(),
      contato_instagram: z.string().nullable(), */
    }),
    handler: async (input) => {

      const { sobre_titulo, sobre_conteudo } = input;

      const { data, error } = await supabase
        .from('cms')
        .update({ sobre_titulo: sobre_titulo })
        .eq('id', 1)
        .select()

      return data
    },
  }),
};
