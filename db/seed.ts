import { db, Contatos } from "astro:db"

export default async function () {
  await db.insert(Contatos).values([
    {
      name: "Ronan Alves de Morais",
      email: "ronan86@gmail.com",
      phone: "0416429064",
      message: "Olá, estou interessado em comprar um carro."
    }
  ])
}/*  */