import { ActionError, defineAction } from 'astro:actions';
import { z } from "zod";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API);

export const server = {
  send: defineAction({
    accept: 'form',
    /* input: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      message: z.string(),
    }), */
    handler: async () => {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['ronan86@gmail.com'],
        subject: 'Hello world',
        html: '<strong>It works!</strong>',
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
