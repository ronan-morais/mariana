import { db, Contatos } from "astro:db"

export default async function () {
  await db.insert(Contatos).values([
    {
      nome: "Ronan Alves de Morais",
      email: "ronan86@gmail.com",
      telefone: "0416429064",
      assunto: "Compra de carro",
      mensagem: "Olá, estou interessado em comprar um carro."
    }
  ])
}/*  */