import { useState } from "react";
import type { FormEvent } from "react";
import Button from "./Button.astro";

/* async function postFormData(formData: FormData) {
  const response = await fetch("/api/db", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
} */

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("")

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch("/actions/send-email", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message)
    }
  }

  return (
    <form className="w-full" onSubmit={submit} method="POST">
      <div>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="Nome"
          placeholder="Nome:"
          /* required */
          className="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="E-mail"
          placeholder="E-mail:"
          /* required */
          className="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="Telefone"
          placeholder="(DDD) Telefone:"
          /* required */
          className="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <textarea
          id="message"
          name="message"
          autoComplete="Mensagem"
          placeholder="Mensagem:"
          /* required */
          rows="5"
          className="block w-full my-4 px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-marromTronco px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-marromTitulo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar mensagem
        </button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
