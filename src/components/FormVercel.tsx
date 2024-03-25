import { createSignal, createResource, Suspense } from "solid-js";


async function postFormData(formData: FormData) {
  const response = await fetch("/api/feedback", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}

export default function FormVercel() {

  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
  }

  return (
    <form class="w-full" onSubmit={submit}>
      <div>
        <input
          id="nome"
          name="nome"
          type="text"
          autocomplete="Nome"
          placeholder="Nome:"
          /* required */
          class="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="E-mail"
          placeholder="E-mail:"
          /* required */
          class="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          autocomplete="Telefone"
          placeholder="(DDD) Telefone:"
          /* required */
          class="block my-4 w-full px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        />
      </div>
      <div>
        <textarea
          id="mensagem"
          name="mensagem"
          autocomplete="Mensagem"
          placeholder="Mensagem:"
          /* required */
          rows="5"
          class="block w-full my-4 px-5 py-4 font-normal rounded-md border-0 text-marromTitulo placeholder:text-marromTronco sm:text-lg sm:leading-6"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-marromTronco px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-marromTitulo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enviar mensagem
        </button>
      </div>
      <Suspense>{response() && <p>{response().message}</p>}</Suspense>
    </form>
  );
}
